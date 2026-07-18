const Product = require("../models/productModel")
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const cloudinary = require("../config/cloudinary");

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

const postProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      stock,
      ratings,
      numReviews,
      isFeatured,
    } = req.body;

    if (
      !name ||
      !description ||
      !brand ||
      !category ||
      price === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }
    const uploadedImage = await uploadToCloudinary(
            req.file.buffer,
            "TechSphere/products"
        );


    const product = new Product({
      name,
      description,
      brand,
      category,
      price,
      stock,
      ratings,
      numReviews,
      isFeatured,

      images: [
    {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
    },
],
    });

    await product.save();

    return res.status(201).json({
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

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

    if (req.file) {

    if (
    product.images &&
    product.images.length > 0 &&
    product.images[0].public_id
) {
    await cloudinary.uploader.destroy(
        product.images[0].public_id
    );
}

    const uploaded = await uploadToCloudinary(
        req.file.buffer,
        "TechSphere/products"
    );

    product.images = [
        {
            url: uploaded.secure_url,
            public_id: uploaded.public_id,
        },
    ];
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
    await cloudinary.uploader.destroy(
    product.images[0].public_id
    );

     return res.send({
        message:"Product Deleted Successfully"
    })
}

module.exports = {getProducts,getProductById,postProduct,putProducts,deleteProduct}
