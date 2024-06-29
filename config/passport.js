import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
//import { verifyToken } from './jwtUtils.js';
import User from '../models/Users.js'; 

dotenv.config();

// Configurar las opciones para la estrategia JWT
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRETKEY
};

// Utilizar la estrategia de JWT
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log('Inicializando la estrategia');
    console.log('Payload del token:', jwt_payload);

    try {
        // Buscar el usuario en la base de datos usando el ID del payload del token
        const user = await User.findById(jwt_payload.id);

        if (user) {
            return done(null, user); // Si se encuentra el usuario, se devuelve
        } else {
            return done(null, false); // Si no se encuentra el usuario, se devuelve falso
        }
    } catch (error) {
        return done(error, false); // Si hay un error, se devuelve el error
    }
}));

export default passport;
