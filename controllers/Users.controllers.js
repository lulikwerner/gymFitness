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
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getAllUsers = async (req, res) => {
        const users = await this.db.getAllUsers()
        res.json(users)
    }
    // Ruta para obtener el perfil del usuario autenticado
    getProfile = async (req, res) => {
        try {
            // Verificar y decodificar el token JWT del encabezado de autorización
            const token = req.headers.authorization.split(' ')[1]; // Obtener el token del encabezado
            const decodedToken = decodeToken(token);


            // Acceder al ID del usuario desde el token decodificado
            const userEmail = decodedToken.email;
            console.log(userEmail)
            // Buscar al usuario por su ID en la base de datos
            const user = await this.db.getUserByEmail(userEmail);
            console.log('elsuer', user)
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

    getUsersById = async (req, res) => {
        //Obtengo el token
        const token = req.headers.authorization.split(' ')[1];

        // Decodificar el token para obtener el dni del usuario
        const decodedToken = decodeToken(token);

        if (decodedToken && decodedToken.dni) {

            const userDni = decodedToken.dni;
            console.log('ID del usuario desde el token:', userDni);
            try {
                const user = await User.findById(userDni);

                if (!user) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }

                // Aquí decides qué datos del usuario deseas devolver como perfil
                const userProfile = {
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    name: user.dni,
                    age: user.age,
                    // Agrega más campos según sea necesario
                };

                res.status(200).json({ message: 'Perfil de usuario obtenido correctamente', data: userProfile });

            } catch (error) {
                console.error('Error al obtener perfil de usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        }
    }

    addUser = async (req, res) => {
        const user = this.userHelpers.parseUser(req.body)
        const result = await this.db.addUser(user)
        console.log('elreu', result)
        res.json(result)
    }

    updateUser = async (req, res) => {
        const user = this.userHelpers.parseUser(req.body);
        const result = await this.db.updateUser(user);
        res.json(result); // Devuelve el usuario modificado como respuesta
    }



    deleteUser = async (req, res) => {
        const { id } = req.params
        const result = await this.db.deleteUser(id)
        res.json(result)
    }
}

