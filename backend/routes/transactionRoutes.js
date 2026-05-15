const express = require('express');
const router = express.Router();

const transactionController = require("../controllers/transactionController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// role based access control
router.get("/", auth, role(["owner", "admin", "auditor"]), transactionController.getAllTransactions);
router.post("/", auth, role(["owner", "admin"]), transactionController.createTransaction);
router.get("/:id_transaction", auth, role(["owner", "admin", "auditor"]), transactionController.getTransactionById);

module.exports = router;