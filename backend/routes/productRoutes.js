const express = require("express")
const { getProducts, getProductById, postProduct, putProducts, deleteProduct } = require("../controllers/productController")
const productRouter = express.Router()

productRouter.get("/",getProducts)
productRouter.get("/:id",getProductById)
productRouter.post("/",postProduct)
productRouter.put("/:id",putProducts)
productRouter.delete("/:id",deleteProduct)

module.exports = productRouter