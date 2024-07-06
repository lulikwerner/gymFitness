import jwt from 'jsonwebtoken';
import { cookieExtractor } from '../utils.js';
import dotenv from 'dotenv';

dotenv.config();

export const privacy = (privacyType) => {
  return (req, res, next) => {
    const token = cookieExtractor(req) || req.headers.authorization?.split(' ')[1];

    if (!token) {
      // Si no hay token, redirigir según el caso de NO_AUTH
      if (privacyType.includes('NO_AUTH')) {

        next();
      } else {

        res.redirect('/api/sessions/login');
      }
      return;
    }

    try {
      // Decodificar el token para obtener los datos del usuario
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      const user = decoded; // Aquí deberías tener los datos del usuario decodificados



      // Verificar cada tipo de acceso en privacyType
      if (privacyType.includes('PRIVATE')) {
        // Permitir acceso si es administrador o usuario normal
        if (user.email === process.env.ADMIN_EMAIL || user.email !== process.env.ADMIN_EMAIL) {
          next();
        } else {
          res.redirect('/index');
        }
      } else if (privacyType.includes('ADMIN')) {
        if (user.email === process.env.ADMIN_EMAIL) {
          next();
        } else {
          res.redirect('/index');
        }
      } else if (privacyType.includes('NO_AUTH')) {
        if (!user) {
          next();
        } else {
          res.redirect('/index');
        }
      } else {
        res.redirect('/index');
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      res.redirect('/api/sessions/login');
    }
  };
};
