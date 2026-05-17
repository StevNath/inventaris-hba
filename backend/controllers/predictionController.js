const db = require("../config/db");
const { spawn } = require("child_process");
const path = require("path");

exports.getStockPredictions = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        t.id_produk,
        p.nama_produk,

        SUM(CASE WHEN t.tipe = 'masuk' THEN t.jumlah ELSE 0 END) AS units_ordered,
        SUM(CASE WHEN t.tipe = 'keluar' THEN t.jumlah ELSE 0 END) AS units_sold,

        (
          SELECT t2.stok_akhir
          FROM transactions t2
          WHERE t2.id_produk = t.id_produk
          ORDER BY t2.tanggal DESC
          LIMIT 1
        ) AS stok_akhir

      FROM transactions t
      JOIN products p ON t.id_produk = p.id_produk

      WHERE DATE(t.tanggal) = (
        SELECT MAX(DATE(t3.tanggal))
        FROM transactions t3
        WHERE t3.id_produk = t.id_produk
      )

      GROUP BY 
        t.id_produk,
        p.nama_produk
    `);

    const inputList = rows.map((item) => {
      const units_sold = Number(item.units_sold);
      const units_ordered = Number(item.units_ordered);
      const stok_akhir = Number(item.stok_akhir);

      const previous_inventory =
        stok_akhir - units_ordered + units_sold;

      return {
        product_id: Number(String(item.id_produk).replace("P", "")),
        previous_inventory,
        units_sold,
        units_ordered,
      };
    });

    const modelPath = path.join(__dirname, "../../model/predict.py");

    const modelResult = await new Promise((resolve, reject) => {
      const python = spawn("python", [
        modelPath,
        JSON.stringify(inputList),
      ]);

      let result = "";
      let error = "";

      python.stdout.on("data", (data) => {
        result += data.toString();
      });

      python.stderr.on("data", (data) => {
        error += data.toString();
      });

      python.on("close", () => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(result));
        }
      });
    });

    const predictions = rows.map((item, index) => {
      const units_sold = Number(item.units_sold);
      const units_ordered = Number(item.units_ordered);
      const stok_akhir = Number(item.stok_akhir);
      const prediction = modelResult.predictions[index];

      const previous_inventory =
        stok_akhir - units_ordered + units_sold;

      return {
        id_produk: item.id_produk,
        nama_produk: item.nama_produk,
        stok_sekarang: stok_akhir,
        total_masuk: units_ordered,
        total_keluar: units_sold,
        previous_inventory,
        prediksi_stok: Math.round(prediction),
        status: prediction <= 5 ? "Stok Rendah" : "Aman",
      };
    });

    res.json(predictions);
  } catch (err) {
    res.status(500).json({
      error: err.toString(),
    });
  }
};