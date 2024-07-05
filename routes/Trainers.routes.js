import express from 'express';
import Routes from "./Routes.js";
import upload from "../config/multer.js"
import TrainersControllers from "../controllers/Trainers.controller.js";

export default class TrainerRoutes extends Routes {

    constructor() {
        super(); // Llama al constructor de la clase base
        this.controller = new TrainersControllers();
        this.getRouter(); // Llama al método para configurar las rutas
    }

    getRouter() {
        this.router
            .get('/', this.controller.getAllTrainers)
            .post('/', this.controller.addTrainer)
            .put('/:id',  upload.single('imagen'),this.controller.updateTrainer)
            .delete('/:id', this.controller.deleteTrainer)
        return this.router;
    }
}
