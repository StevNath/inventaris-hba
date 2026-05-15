const db = require("../config/db");

// ambil semua transaksi
exports.getAllTransactions = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
             t.id_transaction, 
             t.tanggal,
             u.name_account,
             p.nama_produk,
             t.tipe,
             t.jumlah,
             t.stok_akhir
            FROM transactions t
            JOIN users u ON t.id_account = u.id_account
            JOIN products p ON t.id_produk = p.id_produk 
            `)
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// buat transaksi baru
exports.createTransaction = async (req, res) => {
    try {
        const { id_produk, tipe, jumlah } = req.body;
        const id_account = req.user.id_account;
    
        const [products] = await db.query(
            "SELECT * FROM products WHERE id_produk = ?",
            [id_produk]
        );

        if (products.length === 0) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }

        const product = products[0];
        let stok_akhir;
        if (tipe === "masuk") {
            stok_akhir = product.jumlah + jumlah;
        } else if (tipe === "keluar") {
            if (product.jumlah < jumlah) {
                return res.status(400).json({ message: "Stok tidak cukup" });
            }
            stok_akhir = product.jumlah - jumlah;
        } else {
            return res.status(400).json({ message: "Tipe transaksi tidak valid" });
        }
        await db.query(
            "UPDATE products SET jumlah = ? WHERE id_produk = ?",
            [stok_akhir, id_produk]
        );

        await db.query(
            `INSERT INTO transactions
            (id_produk, id_account, tipe, jumlah, stok_akhir)
            VALUES (?, ?, ?, ?, ?)`,
            [id_produk, id_account, tipe, jumlah, stok_akhir]
        );
        
        res.json({ message: "Transaksi berhasil ditambahkan" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ambil transaksi berdasarkan id
exports.getTransactionById = async (req, res) => {
    try {
        const { id_transaction } = req.params;
        const [rows] = await db.query(`
            SELECT
             t.id_transaction, 
             t.tanggal,
             u.name_account,
             p.nama_produk,
             t.tipe,
             t.jumlah,
             t.stok_akhir
            FROM transactions t
            JOIN users u ON t.id_account = u.id_account
            JOIN products p ON t.id_produk = p.id_produk 
            WHERE t.id_transaction = ?
        `, [id_transaction]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
