import express from 'express'
import Server from './server/Server.js'
import dotenv from 'dotenv'
// import { authRoutes } from './auth/index.js';
//import session from "express-session"
import passport from './config/passport.js'
import SessionRouter from "./routes/Session.routes.js"
import UserRouter from "./routes/Users.routes.js"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8080;
const server = new Server();
//server.run(PORT);
//console.log(process.env)
//console.log(process.argv)

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize());

// Crear las instancias de las rutas
const sessionRouter = new SessionRouter();
const userRouter = new UserRouter();
//app.use('/auth', authRoutes)
app.use("/api/sessions", sessionRouter.getRouter());
app.use("/api/users", userRouter.getRouter());

app.listen(PORT,() =>{
    console.clear()
    console.log(`Escuchando en http://localhost:${PORT}`)
})