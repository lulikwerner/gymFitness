import express from 'express';
import Routes from "./Routes.js";
import upload from '../config/multer.js';
import { privacy } from '../config/auth.js';
import UsersControllers from "../controllers/Users.controllers.js";

export default class UserRoutes extends Routes {

    constructor() {
        super(); // Llama al constructor de la clase base
        this.controller = new UsersControllers();
        this.router = express.Router(); // Inicializa el router
        this.getRouter(); // Llama al método para configurar las rutas
    }

    getRouter() {
        this.router
            .get('/', privacy(['PRIVATE']),this.controller.getAllUsers) 
            .get('/profile', privacy(['PRIVATE']),this.controller.getProfile)
            .get('/:email', privacy(['PRIVATE']),this.controller.getUserByID) 
            .post('/', privacy(['NO_AUTH','PRIVATE']),this.controller.addUser)
            .put('/:id', upload.single('avatar'), privacy(['PRIVATE']), this.controller.updateUser)
            .delete('/:id', privacy(['ADMIN']), this.controller.deleteUser);
        return this.router;
    }
}
