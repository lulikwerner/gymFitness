import express from 'express';
import Routes from "./Routes.js";
import upload from "../config/multer.js"
import UsersControllers from "../controllers/Users.controllers.js";

export default class UserRoutes extends Routes {

    constructor() {
        super(); // Llama al constructor de la clase base
        this.controller = new UsersControllers();
        this.getRouter(); // Llama al método para configurar las rutas
    }

    getRouter() {
        this.router
            .get('/', this.controller.getAllUsers) 
            .get('/profile', this.controller.getProfile)
            .get('/:email', this.controller.getUserByID) 
            .post('/', this.controller.addUser)
            .put('/:id',  upload.single('imagen'),this.controller.updateUser)
            .delete('/:id', this.controller.deleteUser);
        return this.router;
    }

}
