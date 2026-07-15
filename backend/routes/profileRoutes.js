const express = require("express")
const profileRouter = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const { getProfile, updateProfile, uploadAvatar } = require("../controllers/profileController")
const upload = require("../middleware/uploadMiddleware")




profileRouter.get("/profile",authMiddleware,getProfile)
profileRouter.put("/profile",authMiddleware,updateProfile)
profileRouter.put("/avatar",authMiddleware,upload.single("avatar"),uploadAvatar)

module.exports = profileRouter