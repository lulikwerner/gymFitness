import express from 'express';
import Routes from './Routes.js'; 
import multer from '../config/multer.js'; 
import FormControllers from '../controllers/Form.controllers.js'; 

export default class FormRoutes extends Routes {
    constructor() {
        super();
        this.controller = new FormControllers();
        this.getRouter();
        this.router = express.Router();
    }

    getRouter() {
        this.router
            .post('/contact', multer.single('imagen'), this.controller.addForm);

        return this.router;
    }
}
