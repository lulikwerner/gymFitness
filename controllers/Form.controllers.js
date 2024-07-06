import multer from 'multer';
import upload from '../config/multer.js';
import FormHelpers from '../helpers/form.helpers.js';
import FormDaoMysql from '../db/daos/form.dao.mysql.js';

export default class FormControllers {
    constructor() {
        this.formHelpers = new FormHelpers();
        this.db = new FormDaoMysql()
        this.updateFormWithImage = multer({ storage: upload }).single('imagen');
    }

    // Middleware para actualizar el formulario con la imagen
    updateFormWithImageMiddleware(req, res, next) {
        this.updateFormWithImage(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'Error al cargar el archivo' });
            } else if (err) {
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            next();
        });
    }


    addForm = async (req, res) => {
        try {
  
            const formData = this.formHelpers.parseContact(req.body);

            console.log(req.body);
            // Obtener el nombre del archivo adjunto desde req.file
            const imagen = req.file ? req.file.filename : null;
            const plan = req.body.plan;
            const conocio = req.body.conociste;
            console.log("conociste? ", conocio);

            // Combinar datos del formulario con la imagen
            const form = { ...formData, plan, conocio, imagen };
            // Llamar a la función addForm de la base de datos para guardar el formulario
            const result = await this.db.addForm(form);
            res.status(200).json({ message: '¡Formulario enviado con éxito!', result });
        } catch (error) {
            console.error('Error al procesar el formulario:', error);
            res.status(500).json({ error: 'Error al procesar el formulario' });
        }
    }
}
