import express from 'express';
import Routes from "./Routes.js";
import PlansControllers from "../controllers/Plans.controllers.js";

export default class PlanRoutes extends Routes {

    constructor() {
        super(); // Llama al constructor de la clase base
        this.controller = new PlansControllers();
        this.getRouter(); // Llama al método para configurar las rutas
    }

    getRouter() {
        this.router
            .get('/', this.controller.getAllPlans)
            .post('/', this.controller.addPlan)
            .put('/:id', this.controller.updatePlan)
            .delete('/:id', this.controller.deletePlan)
        return this.router;
    }
}
