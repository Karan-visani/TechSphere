const mongoose = require("mongoose")

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        name:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },
        brand:{
            type:String,
            required:true,
            trim:true,
        },
        category:{
            type:String,
            required:true,
            trim:true,
        },
        price:{
            type:Number,
            required:true,
            min:0,
        },
        stock:{
            type:Number,
            required:true,
            min:0,
            default:0,
        },
        images: [
        {
            type: String,
        },
        ],
        ratings:{
            type:String,
            default:0,
        },
        numReviews:{
            type:String,
            default:0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)
)

module.exports = Product