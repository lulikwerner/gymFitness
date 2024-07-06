import express from 'express';
import Routes from "./Routes.js";
import upload from "../config/multer.js"
import { privacy } from '../config/auth.js';
import TrainersControllers from "../controllers/Trainers.controller.js";

export default class TrainerRoutes extends Routes {

    constructor() {
        super(); // Llama al constructor de la clase base
        this.controller = new TrainersControllers();
        this.getRouter(); // Llama al método para configurar las rutas
    }

    getRouter() {
        this.router
            .get('/', privacy(['ADMIN']),this.controller.getAllTrainers)//OK
            .post('/',privacy(['ADMIN']), this.controller.addTrainer)//OK
            .put('/:id',  privacy(['ADMIN']), upload.single('imagen'),this.controller.updateTrainer)//OK
            .delete('/:id', privacy(['ADMIN']), this.controller.deleteTrainer)//OK
        return this.router;
    }
}
