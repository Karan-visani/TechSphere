require("dotenv").config()
const connectDB = require("./config/db")


const express = require("express")
const cors = require("cors")
const authRouter = require("./routes/authRoutes")
const cookieParser = require("cookie-parser")
const profileRouter = require("./routes/profileRoutes")
const productRouter = require("./routes/productRoutes")


const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))
app.use(cookieParser())
connectDB()

app.use("/auth",authRouter)
app.use("/user",profileRouter)
app.use("/products",productRouter)


app.listen(process.env.PORT)