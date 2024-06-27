import express from 'express';
import Routes from "./Routes.js";
import SessionControllers from '../controllers/Session.controllers.js'; // Asegúrate de importar correctamente el controlador

export default class SessionRoutes extends Routes {

    constructor() {
        super();
        this.router = express.Router(); // Crear un enrutador de Express
        this.controller = new SessionControllers(); // Instanciar el controlador
        this.getRouter(); // Configurar las rutas
    }

    getRouter() {
        console.log('Initializing routes');
        this.router.post('/register', this.controller.register);
        this.router.post('/login', this.controller.login);
        this.router.post('/logout', this.controller.logout);
        return this.router;
}
}


  
      /*this.get('/githubcallback', ['NO_AUTH'], passportCall('github', { strategyType: 'locals' }), usersController.loginGitHubCallback);
  
      this.get('/github', ['NO_AUTH'], passportCall('github', { strategyType: 'locals' }), usersController.loginGithub);
  
      this.get('/current', ['PRIVATE'], passportCall('jwt', { strategyType: "locals" }), usersController.current);
  
      this.post('/restoreRequest',['NO_AUTH'], passportCall('jwt', { strategyType: "jwt" }), usersController.restoreRequest);
  
      this.post('/restorePassword', ['PUBLIC'], passportCall('jwt', { strategyType: "jwt" }), usersController.restorePassword);*/
  
    
  

