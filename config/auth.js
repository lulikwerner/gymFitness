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
        console.log('Acceso NO_AUTH permitido');
        next();
      } else {
        console.log('Redirigiendo a /api/sessions/login');
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
        console.log('Acceso PRIVATE permitido');
        // Permitir acceso si es administrador o usuario normal
        if (user.email === process.env.ADMIN_EMAIL || user.email !== process.env.ADMIN_EMAIL) {
          next();
        } else {
          console.log('No tiene permisos suficientes para realizar esta acción.');
  
          res.redirect('/index');
        }
      } else if (privacyType.includes('ADMIN')) {
        console.log('Acceso ADMIN permitido');
        if (user.email === process.env.ADMIN_EMAIL) {
          next();
        } else {
          console.log('Debe estar logueado como administrador para realizar esta acción.');
  
          res.redirect('/index');
        }
      } else if (privacyType.includes('NO_AUTH')) {
        console.log('Acceso NO_AUTH permitido');
        if (!user) {
          next();
        } else {
          console.log('Redirigiendo a /index');
          res.redirect('/index');
        }
      } else {
        console.log('Caso por defecto');
        res.redirect('/index');
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      res.redirect('/api/sessions/login');
    }
  };
};
