const User = require("../models/userModel")
const cloudinary = require("../config/cloudinary")
const streamifier = require("streamifier")

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

const uploadAvatar = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an image"
            })
        }

        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "TechSphere/Avatars"
                    },
                    (error, result) => {

                        if (error) return reject(error)

                        resolve(result)
                    }
                )

                streamifier.createReadStream(req.file.buffer).pipe(stream)

            })
        }

        const result = await uploadToCloudinary()

        const user = await User.findById(req.user.id)

        user.avatar = result.secure_url

        await user.save()

        return res.status(200).json({
            message: "Avatar Updated Successfully",
            avatar: result.secure_url,
            user
        })

    } catch (error) {

        return res.status(500).json({
            message: error.message
        })

    }
}

module.exports = {getProfile,updateProfile,uploadAvatar}