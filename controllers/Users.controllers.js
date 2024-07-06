import multer from 'multer'
import upload from '../config/multer.js'
import { decodeToken } from '../config/jwtUtils.js';
//import User from '../models/Users.js'
import UsersDaoMysql from '../db/daos/users.dao.mysql.js'
import UsersHelpers from '../helpers/users.helpers.js'
import bcrypt from 'bcryptjs'


export default class UsersControllers {

    constructor() {
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
        try {

            // Verificar y decodificar el token JWT del encabezado de autorización
            const token = req.headers.authorization.split(' ')[1]; // Obtener el token del encabezado
            const decodedToken = decodeToken(token);
            const userEmail = decodedToken.email;
            if (userEmail === process.env.ADMIN_EMAIL) {
                const users = await this.db.getAllUsers()
                res.status(200).json({ users });
            }
            else {
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

    getUserByID = async (req, res) => {
        const { email } = req.params;
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
        const userId = req.params.id; 
        const { name, lastname, age, plan, password, password2 } = req.body; 
        let imagen = req.file ? `/assets/img/uploads/${req.file.filename}` : null; 
    
        // Crear objeto con los datos a actualizar
        const userData = {};
    
        // Actualizar userData con los campos proporcionados
        if (name) {
            userData.name = name;
        }
        if (lastname) {
            userData.lastname = lastname;
        }
        if (age) {
            userData.age = age;
        }
        if (password.trim() !== "" && password2.trim() !== "") {
            if (password !== password2) {
                return res.status(400).json({ error: 'Las contraseñas no coinciden' });
            } else {
                const hash = bcrypt.hashSync(password, 10);
                userData.password = hash;
            }
        }
        if (plan) {
            userData.plan = plan;
        }

        if (imagen) {
            userData.imagen = imagen;
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
        const result = await this.db.deleteUser(id)
        res.json(result)
    }
}

