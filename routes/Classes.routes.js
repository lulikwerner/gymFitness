import express from 'express';
import Routes from "./Routes.js";
import { privacy } from '../config/auth.js';
import ClassesControllers from "../controllers/Classes.controllers.js";

export default class ClassRoutes extends Routes {

    constructor() {
        super(); // Llama al constructor de la clase base
        this.controller = new ClassesControllers();
        this.router = express.Router(); // Inicializa el router
        this.getRouter(); // Llama al método para configurar las rutas
    }

    getRouter() {
        this.router
            .get('/:id', privacy(['PRIVATE']), this.controller.getClass)
            .put('/:id/class/:classId', privacy(['PRIVATE']), this.controller.updateClass)
            .delete('/:id', privacy(['PRIVATE']), this.controller.deleteClass)
        return this.router;
    }
}
