const jwt = require("jsonwebtoken")

const authMiddleware = async (req,res,next) =>{
    
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token not found"
        })
    }


    const decoded = jwt.verify(token,process.env.JWT_SECRET)


    req.user = {
        id : decoded.id,
        role : decoded.role
    }
    next()
}

module.exports = authMiddleware