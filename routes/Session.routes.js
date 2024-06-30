import express from 'express';
import Routes from "./Routes.js";
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
        .get('/check-token', this.controller.checkToken)
        .post('/register', this.controller.register)
        .post('/login', this.controller.login)
        .post('/logout', this.controller.logout)
        return this.router;
    }
}