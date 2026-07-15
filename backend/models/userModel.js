const { default: mongoose } = require("mongoose")


const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:["Customer","Seller","Admin"],
            default:"Customer",
        },
        avatar:{
            type:String,
            default:"",
        },
        phone:{
            type:String,
             default:"",
        },
        address:{
            type:String,
            default:"",
        },
        wishlist:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
        ],
    },
{
    timestamps:true,
})
)

module.exports = User