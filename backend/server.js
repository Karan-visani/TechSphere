const connectDB = require("./config/db")


const express = require("express")
const cors = require("cors")
const authRouter = require("./routes/authRoutes")
const cookieParser = require("cookie-parser")

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
connectDB()

app.use("/auth",authRouter)


app.listen(process.env.PORT)