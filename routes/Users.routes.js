import express from 'express';
import Routes from "./Routes.js";
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
            .get('/:id', this.controller.getUsersById) 
            .post('/', this.controller.addUser)
            .put('/', this.controller.updateUser)
            .delete('/:id', this.controller.deleteUser);
        return this.router;
    }

}
