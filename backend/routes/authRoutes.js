const express = require("express")
const { login, register, logout, currentUser } = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")
const authRouter = express.Router()

authRouter.post("/login",login)
authRouter.post("/register",register)
authRouter.post("/logout",logout)
authRouter.get("/me",authMiddleware,currentUser)

module.exports = authRouter