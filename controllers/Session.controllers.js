import bcrypt from 'bcryptjs'
import UsersDaoMemory from '../db/daos/users.dao.memory.js';
import UsersDaoMysql from '../db/daos/users.dao.mysql.js';
import UsersHelpers from '../helpers/users.helpers.js';

// Importa los DAO y Helpers necesarios

export default class SessionControllers {
    constructor() {
        if (process.argv[2] === 'dev') {
            this.db = new UsersDaoMemory();
        } else if (process.argv[2] === 'prod') {
            this.db = new UsersDaoMysql();
        } else {
            // Manejo de error si process.argv[2] no es válido
            console.error('Modo de ejecución no especificado correctamente.');
            throw new Error('Modo de ejecución no especificado correctamente.');
        }

        this.userHelpers = new UsersHelpers();
    }

    register = async (req, res) => {
        console.log(req.body)
        try {
            const { name, email, age, password } = req.body;
            const hash = bcrypt.hashSync(password)
            // Suponiendo que tienes un método addUser en tu DAO (UsersDaoMysql) para agregar usuarios
            const result = await this.db.addUser({ name, email, age, password });
            res.status(200).json({ message: 'Usuario registrado correctamente', data: result });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    login = (req, res) => {
        // Implementa la lógica para el inicio de sesión aquí
    };

    logout = (req, res) => {
        // Implementa la lógica para cerrar sesión aquí
    };
}
