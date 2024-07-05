import express from 'express';
import Routes from './Routes.js'; 
import multer from '../config/multer.js'; 
import { privacy } from '../config/auth.js'; // Asegúrate de importar correctamente
import FormControllers from '../controllers/Form.controllers.js'; 

export default class FormRoutes extends Routes {
    constructor() {
        super();
        this.controller = new FormControllers();
        this.getRouter(); // Este método debería configurar el router antes de usarlo
        this.router = express.Router();
    }

    getRouter() {
        this.router
            .post('/contact', privacy(['NO_AUTH', 'PRIVATE']), multer.single('imagen'), this.controller.addForm);//OK FALTA CORREGIR CUANDO  ENVIO PLANES Y REFERENCIAS

        return this.router;
    }
}
