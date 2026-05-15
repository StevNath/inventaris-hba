const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER (hanya untuk owner)
exports.register = async (req, res) => {
  try {
    const { account_code, name_account, password, role_id } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    await db.query(
      `INSERT INTO user 
      (account_code, name_account, password, role_id) 
      VALUES (?, ?, ?, ?)`,
      [account_code, name_account, hashedPassword, role_id]
    );

    res.json({
      message: "User berhasil dibuat"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { account_code, password } = req.body;

    const [rows] = await db.query(
      `SELECT u.*, r.role_name
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.account_code = ?`,
      [account_code]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      {
        id_account: user.id_account,
        role: user.role_name,
        account_code: user.account_code
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
        role: user.role_name
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};