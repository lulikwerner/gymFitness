import express from 'express';
import Routes from "./Routes.js";
import { privacy } from '../config/auth.js';
import SessionControllers from '../controllers/Session.controllers.js'; // Asegúrate de importar correctamente el controlador



export default class SessionRoutes extends Routes {

    constructor() {
        super();
        this.router = express.Router(); // Crear un enrutador de Express
        this.controller = new SessionControllers(); // Instanciar el controlador
        this.getRouter(); // Configurar las rutas
    }

    getRouter() {
        this.router
        .get('/check-token', privacy(['NO_AUTH', 'PRIVATE']),this.controller.checkToken) //ok
        .post('/register', privacy(['NO_AUTH']),this.controller.register)//ok
        .post('/login',this.controller.login) //ok
        .post('/logout', privacy(['PRIVATE']),this.controller.logout) //ok
        return this.router;
    }
}