const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// role based access control 

router.get("/", auth, role(["owner", "admin", "auditor"]), productController.getAllProducts);
router.get("/:id_produk", auth, role(["owner", "admin", "auditor"]), productController.getProductById);
router.post("/", auth, role(["owner", "admin"]), productController.createProduct);
router.put("/:id_produk", auth, role(["owner", "admin"]), productController.updateProduct);
router.delete("/:id_produk", auth, role(["owner", "admin"]), productController.deleteProduct);

module.exports = router;