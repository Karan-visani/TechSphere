const User = require("../models/userModel")

const getProfile = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password")

        return res.status(200).json(user)
    }catch(error){
        return res.status(500).json({
            message:"Server Error"
        })
    }
}

const updateProfile = async (req,res)=>{
    try{
        const {name,phone,address} = req.body

     const user = await User.findById(req.user.id).select("-password")

    if(!user){
        return res.status(404).json({
            message:"User Not Found"
        })
    }

    user.name = name
    user.phone = phone
    user.address = address

    await user.save()
    return res.status(200).json({
        message:"Profile Updated",user
    })
    }catch(error){
        return res.status(500).json({
        message:"Server Error"
    })
    }
    
}

module.exports = {getProfile,updateProfile}