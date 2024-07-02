import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
// import { authRoutes } from './auth/index.js';
//import session from "express-session"
import passport from './config/passport.js'
import SessionRouter from "./routes/Session.routes.js"
import UserRouter from "./routes/Users.routes.js"
import FormRouter from "./routes/form.routes.js"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8080;

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize());
app.use(cookieParser());
// Crear las instancias de las rutas
const sessionRouter = new SessionRouter();
const userRouter = new UserRouter();
const formRouter = new FormRouter();
//app.use('/auth', authRoutes)
app.use("/api/sessions", sessionRouter.getRouter());
app.use("/api/users", userRouter.getRouter());
app.use("/api/form", formRouter.getRouter());

app.listen(PORT,() =>{
    console.clear()
    console.log(`Escuchando en http://localhost:${PORT}`)
})