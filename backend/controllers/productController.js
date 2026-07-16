const Product = require("../models/productModel")

const getProducts = async(req,res)=>{
    const products = await Product.find({})
    if(!products){
        return res.status(400).json({
            message:"Products not found"
        })   
    }
    return res.send(products)
}

const getProductById = async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
    return res.status(400).json({
        message:"Products not found"
    })
    }
    return res.send(product)
}

const postProduct = async(req,res)=>{
    const {
        name,
        description,
        brand,
        category,
        price,
        stock,
        ratings,
        numReviews,
        isFeatured
    } = req.body
    
    if ( !name || !description || !brand || !category || price === undefined || stock === undefined){
        return res.status(400).json({
        message:"All fields are required"
    })
    }

    const product = new Product({name:name,description:description,brand:brand,category:category,price:price,stock:stock,ratings:ratings,numReviews:numReviews,isFeatured:isFeatured})
    await product.save()
    return res.send({
        message:"Product Added Successfully"
    })
}

const putProducts = async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
    return res.status(400).json({
        message:"Products not found"
    })
    }

    const {
        name,
        description,
        brand,
        category,
        price,
        stock,
        ratings,
        numReviews,
        isFeatured
    } = req.body
    
    if ( !name || !description || !brand || !category || price === undefined || stock === undefined){
        return res.status(400).json({
        message:"All fields are required"
    })
    }

    product.name = name
    product.description = description
    product.brand = brand
    product.category = category
    product.price = price
    product.stock = stock
    product.ratings = ratings
    product.numReviews = numReviews
    product.isFeatured = isFeatured

    await product.save()
    return res.send({
        message:"Product Updated Successfully"
    })
}

const deleteProduct = async(req,res)=>{
    const product = await Product.findByIdAndDelete(req.params.id)

    if(!product){
    return res.status(400).json({
        message:"Products not found"
    })
    }

     return res.send({
        message:"Product Deleted Successfully"
    })
}

module.exports = {getProducts,getProductById,postProduct,putProducts,deleteProduct}
