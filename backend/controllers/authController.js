const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name_account, password, role_id } = req.body;

    //cek user sudah ada atau belum
    const [existingUser] = await db.query(
      `SELECT * FROM users WHERE name_account = ?`,
      [name_account]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Nama akun sudah digunakan",
      });
    }

    if (!name_account || !password || !role_id) {
      return res.status(400).json({
        message: "Nama akun, password, dan role wajib diisi",
      });
    }

    const rolePrefix = {
      1: "OWN",
      2: "ADM",
      3: "AUD",
    };

    const prefix = rolePrefix[role_id];

    if (!prefix) {
      return res.status(400).json({
        message: "Role tidak valid",
      });
    }

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const dateCode = `${day}${month}${year}`;

    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total
       FROM users
       WHERE role_id = ?
       AND account_code LIKE ?`,
      [role_id, `${prefix}_${dateCode}_%`]
    );

    const nextNumber = countRows[0].total + 1;
    const numberCode = String(nextNumber).padStart(3, "0");

    const account_code = `${prefix}_${dateCode}_${numberCode}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users
      (account_code, name_account, password, role_id)
      VALUES (?, ?, ?, ?)`,
      [account_code, name_account, hashedPassword, role_id]
    );

    res.json({
      message: "User berhasil dibuat",
      account_code,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { name_account, password } = req.body;

    if (!name_account || !password) {
      return res.status(400).json({
        message: "Nama akun dan password wajib diisi",
      });
    }

    const [rows] = await db.query(
      `SELECT u.*, r.role_name
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.name_account = ?`,
      [name_account]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      {
        id_account: user.id_account,
        account_code: user.account_code,
        name_account: user.name_account,
        role: user.role_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id_account: user.id_account,
        account_code: user.account_code,
        name_account: user.name_account,
        role: user.role_name,
      },
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { name_account } = req.body;
    const id_account = req.user.id_account;

    if (!name_account) {
      return res.status(400).json({
        message: "Nama akun wajib diisi",
      });
    }

    await db.query(
      `UPDATE users
       SET name_account = ?
       WHERE id_account = ?`,
      [name_account, id_account]
    );

    res.json({
      message: "Profil berhasil diupdate",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const id_account = req.user.id_account;

    if (!old_password || !new_password) {
      return res.status(400).json({
        message: "Password lama dan password baru wajib diisi",
      });
    }

    const [rows] = await db.query(
      `SELECT * FROM users WHERE id_account = ?`,
      [id_account]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    const user = rows[0];

    const match = await bcrypt.compare(old_password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Password lama salah",
      });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await db.query(
      `UPDATE users
       SET password = ?
       WHERE id_account = ?`,
      [hashedPassword, id_account]
    );

    res.json({
      message: "Password berhasil diubah",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};