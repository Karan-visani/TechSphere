const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async(req,res)=>{
    const {name,email,password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({message:"All Fields Are required"})
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"User Already Exists"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role:"customer",
    })

    const token = jwt.sign(
        {
            id:user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    )

    return res.status(201).cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
    }).json({
        message:"Registered Successfully",
        user:{
            id:user._id,
            name:user.name,
            role:user.role,
            email:user.email
        }
    })
}


const login = async(req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({message:"All Fields Are required"})
    }

    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"Invalid Email or Password"})
    }

    const isMatched = await bcrypt.compare(password,user.password)
    if(!isMatched){
        return res.status(400).json({message:"Invalid Email or Password"})
    }
    

    const token = jwt.sign(
        {
            id:user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    )

    return res.status(200).cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
    }).json({
        message:"Logged In Successfully",
        user:{
            id:user._id,
            name:user.name,
            role:user.role,
            email:user.email
        }
    })
}


const logout = (req,res)=>{
    res.clearCookie("token").status(200).json({
        message:"Logged out successfully"
    })
}

const currentUser = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password")
    if(!user){
        return res.status(400).json({
            message:"User not Found"
        })
    
    }
    return res.status(200).json(user)
    }catch(error){
        return res.status(500).json({
            message:"Server Error"
        })
    }
}

module.exports = {register,login,logout,currentUser}