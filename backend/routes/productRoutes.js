const express = require("express")
const { getProducts, getProductById, postProduct, putProducts, deleteProduct } = require("../controllers/productController")
const authMiddleware = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware");
const productRouter = express.Router()

productRouter.get("/",getProducts)
productRouter.get("/:id",getProductById)
productRouter.post("/",upload.single("image"),postProduct)
productRouter.put("/:id",upload.single("image"),putProducts);
productRouter.delete("/:id",deleteProduct)


module.exports = productRouter