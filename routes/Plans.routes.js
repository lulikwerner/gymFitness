import express from 'express';
import Routes from "./Routes.js";
import { privacy } from '../config/auth.js';
import PlansControllers from "../controllers/Plans.controllers.js";

export default class PlanRoutes extends Routes {

    constructor() {
        super(); // Llama al constructor de la clase base
        this.controller = new PlansControllers();
        this.getRouter(); // Llama al método para configurar las rutas
    }

    getRouter() {
        this.router
            .get('/', privacy(['ADMIN']),this.controller.getAllPlans)//OK
            .post('/', privacy(['ADMIN']),this.controller.addPlan)//OK
            .put('/:id', privacy(['ADMIN']), this.controller.updatePlan)//OK
            .delete('/:id',privacy(['ADMIN']), this.controller.deletePlan)//OK
        return this.router;
    }
}
