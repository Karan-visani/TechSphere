const express = require("express")
const profileRouter = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const { getProfile, updateProfile } = require("../controllers/profileController")



profileRouter.get("/profile",authMiddleware,getProfile)
profileRouter.put("/profile",authMiddleware,updateProfile)

module.exports = profileRouter