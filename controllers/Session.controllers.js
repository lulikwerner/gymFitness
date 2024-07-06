import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import UsersDaoMysql from '../db/daos/users.dao.mysql.js';
import UsersHelpers from '../helpers/users.helpers.js';

// Importa los DAO y Helpers necesarios

export default class SessionControllers {
    constructor() {
        this.db = new UsersDaoMysql();
        this.userHelpers = new UsersHelpers();
    }



    register = async (req, res) => {
        try {
            const { dni, name, lastname, email, age, password, password2 } = req.body;
    
            if (!dni || !name || !lastname || !email || !age || !password || !password2) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }
    
            if (isNaN(age)) {
                return res.status(400).json({ error: 'La edad debe ser un número' });
            }
    
            if (isNaN(dni)) {
                return res.status(400).json({ error: 'El DNI debe ser un número' });
            }
    
            if (password !== password2) {
                return res.status(400).json({ error: 'Las contraseñas no coinciden' });
            }
    
            const userExist = await this.db.getUserByEmail(email);
            if (!userExist) {
                const hash = bcrypt.hashSync(password, 10);
                const result = await this.db.addUser({ dni, name, lastname, email, age, password: hash });
                return res.status(200).json({ message: 'Usuario registrado correctamente', data: result });
            } else {
                return res.status(400).json({ error: 'Ya existe un usuario con ese email registrado' });
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
    
    
    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }
            if (email === process.env.ADMIN_EMAIL) {
                // Validar la contraseña del administrador
                const isAdminPasswordCorrect = (password === process.env.ADMIN_PW);
        
                if (!isAdminPasswordCorrect) {
                    return res.status(401).json({ error: 'Usuario o Contraseña incorrecta' });
                }
        
                // Generar el token JWT para el administrador
                const token = jwt.sign({ email: process.env.ADMIN_EMAIL, role: 'admin' }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
        
                // Configura la cookie
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 3600000
                });
        
                return res.status(200).json({ message: 'Usuario admin logeado correctamente', token });
               // return res.redirect(`/admin.html?token=${token}`);
            }
        
            // Busca el usuario por correo electrónico en la base de datos
            const user = await this.db.getUserByEmail(email);
        
            if (!user) {
                return res.status(404).json({ error: 'No existe el usuario' });
            }
        
            // Compara la contraseña ingresada con la contraseña almacenada hasheada
            const passwordMatch = bcrypt.compareSync(password, user.password);
        
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Usuario o Contraseña incorrecta' });
            }
        
            // Generar el token JWT para el usuario
            const tokenuser = jwt.sign({ email: user.email, id: user.dni }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
        
            // Configura la cookie
            res.cookie('token', tokenuser, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 3600000
            });
        
            return res.status(200).json({ message: 'Usuario logeado correctamente', tokenuser });
        } catch (error) {
            console.error('Error en el servidor:', error);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
    };
    

    

    
    



    logout = (req, res) => {
        // Limpiar la cookie 'token'
        res.clearCookie('token');
        // Redirigir a la página principal
        res.redirect(`/index.html`);
    };


    checkToken = (req, res) => {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ tokenValid: false });
        }

        jwt.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ tokenValid: false });
            }

            res.json({ tokenValid: true });
        });
    }
}
