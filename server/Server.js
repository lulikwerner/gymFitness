import express from 'express';
import UserRoutes from '../routes/users.routes.js';
import ProductRoutes from '../routes/Products.routes.js'

export default class Server {
    constructor() {
        this.app = express();
        this.middlewares();
        this.setupRoutes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    setupRoutes() {
        const usersRoutes = new UserRoutes();
        const productsRoutes = new ProductRoutes();
        this.app.use('/users', usersRoutes.router); // Assuming UserRoutes has a router property
        this.app.use('/products', productsRoutes.router);
    }

    run(port) {
        this.app.listen(port, () => {
            console.log('Listening at', port);
        });
    }

}

// Running the server
//const server = new Server();
//server.run(3000); // Change 3000 to the desired port number
