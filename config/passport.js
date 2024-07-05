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
            return done(null, user); 
        } else {
            return done(null, false); 
        }
    } catch (error) {
        return done(error, false); 
    }
}));

export default passport;
