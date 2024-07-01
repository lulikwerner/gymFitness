import multer from 'multer'
import upload from '../config/multer.js'
import { decodeToken } from '../config/jwtUtils.js';
import User from '../models/Users.js'
import UsersDaoMemory from '../db/daos/users.dao.memory.js'
import UsersDaoMysql from '../db/daos/users.dao.mysql.js'
import UsersHelpers from '../helpers/users.helpers.js'


export default class UsersControllers {

    constructor() {
        if (process.argv[2] === 'dev')
            this.db = new UsersDaoMemory()
        if (process.argv[2] === 'prod')
            this.db = new UsersDaoMysql()

        this.userHelpers = new UsersHelpers()
    }
//Middleware multer
    updateUserWithImage = multer({ storage: upload }).single('imagen');


    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getAllUsers = async (req, res) => {
        console.log('buscando los usuarios')
        try {

            // Verificar y decodificar el token JWT del encabezado de autorización
            const token = req.headers.authorization.split(' ')[1]; // Obtener el token del encabezado
            const decodedToken = decodeToken(token);
            const userEmail = decodedToken.email;
            if(userEmail=== process.env.ADMIN_EMAIL){
        const users = await this.db.getAllUsers()
        res.status(200).json({ users });
            }
            else{
                return res.status(403).json({ error: 'No tienes permisos suficientes' });
            }
    } catch (error) {
        console.error('Error al obtener perfil de usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    }
    // Ruta para obtener el perfil del usuario autenticado
    getProfile = async (req, res) => {
        try {
            // Verificar y decodificar el token JWT del encabezado de autorización
            const token = req.headers.authorization.split(' ')[1]; // Obtener el token del encabezado
            const decodedToken = decodeToken(token);


            // Acceder al ID del usuario desde el token decodificado
            const userEmail = decodedToken.email;
            // Buscar al usuario por su ID en la base de datos
            const user = await this.db.getUserByEmail(userEmail);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            // Si el usuario se encuentra, responder con sus datos
            res.status(200).json({ user });
        } catch (error) {
            console.error('Error al obtener perfil de usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    getUserByID = async(req, res) =>{
        const { email } = req.params;
        console.log(`Buscando al usuario con email: ${email}`);

        try {
           const user = await this.db.getUserByEmail(email);

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.json(user); // Devuelve el usuario encontrado como JSON
        } catch (error) {
            console.error('Error al buscar usuario por ID:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    addUser = async (req, res) => {
        const user = this.userHelpers.parseUser(req.body)
        const result = await this.db.addUser(user)
        res.json(result)
    }

    updateUser = async (req, res) => {
        const userId = req.params.id; // Obtener el ID del usuario de los parámetros de la URL
        const { plan } = req.body; // Datos actualizados del usuario: solo plan
        const imagenPath = req.file ? req.file.path : null; // Obtener la ruta de la imagen si se cargó
    
        // Crear objeto con los datos a actualizar
        const userData = {};
        
        // Actualizar userData con el plan si se proporcionó
        if (plan) {
            userData.plan = plan;
        }
    
        // Actualizar userData con la ruta de la imagen si se proporcionó
        if (imagenPath) {
            userData.imagen = imagenPath;
        }
    
        try {
            const result = await this.db.updateUser(userId, userData);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            res.json({ message: 'Usuario actualizado con éxito' });
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
    };
    



    deleteUser = async (req, res) => {
        const { id } = req.params
        console.log('borrando')
        console.log(id)
        const result = await this.db.deleteUser(id)
        res.json(result)
    }
}

