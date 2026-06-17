const db = require("../config/db");

// ambil semua produk
exports.getAllProducts = async (req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM products")
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ambil produk berdasarkan id
exports.getProductById = async (req, res) => {
    try {
        const { id_produk } = req.params;
        const [rows] = await db.query("SELECT * FROM products WHERE id_produk = ?", [id_produk]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// tambah produk baru
exports.createProduct = async (req, res) => {
  try {
    const { id_produk, nama_produk, satuan } = req.body;

    await db.query(
      `INSERT INTO products
      (id_produk, nama_produk, satuan, jumlah)
      VALUES (?, ?, ?, ?)`,
      [id_produk, nama_produk, satuan, 0]
    );

    res.json({
      message: "Produk berhasil ditambahkan",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// update produk
exports.updateProduct = async (req, res) => {
    try {
        const { id_produk } = req.params;
        const { nama_produk, satuan, jumlah } = req.body;
        
        await db.query(
            `UPDATE products 
             SET nama_produk = ?, satuan = ?, jumlah = ? 
             WHERE id_produk = ?`,
            [nama_produk, satuan, jumlah, id_produk]
        );

        res.json({ message: "Produk berhasil diupdate" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// delete produk
exports.deleteProduct = async (req, res) => {
    try {
        const { id_produk } = req.params;
        await db.query("DELETE FROM products WHERE id_produk = ?", [id_produk]);

        res.json({ message: "Produk berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}