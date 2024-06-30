import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
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
        console.log(req.body);
        try {
            const { dni, name, lastname, email, age, password, password2 } = req.body;
    
            // Validar que no haya campos vacíos
            if (!dni || !name || !lastname || !email || !age || !password || !password2) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }
    
            // Validar que la edad sea un número
            if (isNaN(age)) {
                return res.status(400).json({ error: 'La edad debe ser un número' });
            }
    
            // Validar que el dni sea un número
            if (isNaN(dni)) {
                return res.status(400).json({ error: 'El DNI debe ser un número' });
            }
    
            // Verificar si el password y password2 son iguales
            if (password !== password2) {
                return res.status(400).json({ error: 'Las contraseñas no coinciden' });
            }
            //Busco si el usuario existe en mi db
            const userExist = await this.db.getUserByEmail(email);
            console.log(userExist)
            if(!userExist){
            const hash = bcrypt.hashSync(password, 10); // Asegúrate de especificar el número de saltos
    
            const result = await this.db.addUser({ dni, name, lastname, email, age, password: hash }); // Aquí pasas 'hash' como password
    
            res.redirect('/login.html');
            //res.status(200).json({ message: 'Usuario registrado correctamente', data: result });
        }else{
            res.status(400).json({ error: 'El email ya existe' });
            //aca hay que enviar el error y enviarlo a login
        }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
    
    
    

    
    login = async (req, res) => {
        const { email, password } = req.body;
        try {
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
    
                // Redirigir a la página del administrador
                return res.redirect(`/admin.html?token=${token}`);
            }
    
            // Busca el usuario por correo electrónico en la base de datos
            const user = await this.db.getUserByEmail(email);
    
            if (!user) {
                return res.redirect(`/register.html`);
               // return res.status(404).json({ error: 'No existe el usuario' });
            }
    
            // Compara la contraseña ingresada con la contraseña almacenada hasheada
            const passwordMatch = bcrypt.compareSync(password, user.password);
    
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Usuario o Contraseña incorrecta' });
            }
    
            // Generar el token JWT para el usuario
            const token = jwt.sign({ email: user.email, id: user.dni }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
    
            // Configura la cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 3600000
            });
    
            // Redirigir a la página del usuario
            res.redirect(`/profile.html?token=${token}`);
        } catch (error) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }
    };

    

    
    



    logout = (req, res) => {
        // Limpiar la cookie 'token'
        res.clearCookie('token');
        
        // Redirigir a la página principal
        res.redirect(`/index.html`);
    };
    
}
