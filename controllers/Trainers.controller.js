import multer from 'multer'
import upload from '../config/multer.js'
import { decodeToken } from '../config/jwtUtils.js';
import TrainersDaoMysql from '../db/daos/trainers.dao.mysql.js'
import TrainersHelpers from '../helpers/trainers.helpers.js'


export default class TrainersControllers {

    constructor() {
        this.db = new TrainersDaoMysql()
        this.trainerHelpers = new TrainersHelpers()
    }
//Middleware multer
    updateUserWithImage = multer({ storage: upload }).single('imagen');


    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getAllTrainers = async (req, res) => {
        console.log('buscando los entrenadores')
        try {
            // Verificar y decodificar el token JWT del encabezado de autorización
            const token = req.headers.authorization.split(' ')[1]; // Obtener el token del encabezado
            const decodedToken = decodeToken(token);
            const userEmail = decodedToken.email;
            if(userEmail=== process.env.ADMIN_EMAIL){
                const trainers = await this.db.getAllTrainers()
                res.status(200).json({ trainers });
            } else{
                return res.status(403).json({ error: 'No tienes permisos suficientes' });
            }
        } catch (error) {
            console.error('Error al obtener perfil de usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    addTrainer = async (req, res) => {
        const trainer = this.trainerHelpers.parseTrainer(req.body)
        const result = await this.db.addTrainer(trainer)
        res.json(result)
    }

    updateTrainer = async (req, res) => {
        // const trainerId = req.params.id; // Obtener el ID del usuario de los parámetros de la URL
        const { idTrainer, nombre, apellido, especialidad, descripcion, precio } = req.body;
        console.log(req.body); // Datos actualizados del usuario: solo plan
        const imagenPath = req.file ? req.file.path : null; // Obtener la ruta de la imagen si se cargó
    
        // Crear objeto con los datos a actualizar
        const trainerData = {};
        
        // Actualizar userData con el plan si se proporcionó
        if (nombre) {
            trainerData.nombre = nombre;
        }

        if (apellido) {
            trainerData.apellido = apellido;
        }

        if (especialidad) {
            trainerData.especialidad = especialidad;
        }

        if (descripcion) {
            trainerData.descripcion = descripcion;
        }

        if (precio) {
            trainerData.precio = precio;
        }
        // Actualizar userData con la ruta de la imagen si se proporcionó
        if (imagenPath) {
            trainerData.imagen = imagenPath;
        }
    
        try {
            const result = await this.db.updateTrainer(idTrainer, trainerData);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Entrenador no encontrado' });
            }
    
            res.json({ message: 'Entrenador actualizado con éxito' });
        } catch (error) {
            console.error('Error al actualizar el Entrenador:', error);
            res.status(500).json({ error: 'Error al actualizar el Entrenador' });
        }
    };
    



    deleteTrainer = async (req, res) => {
        const { id } = req.params
        console.log('borrando')
        console.log(id)
        const result = await this.db.deleteTrainer(id)
        res.json(result)
    }
}

