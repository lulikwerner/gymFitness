import UsersControllers from "../controllers/Users.controllers.js";
import Routes from "./Routes.js";

export default class UserRoutes extends Routes{

    constructor(){
        super() //es para poder extender de Routes y usar eso
        this.controller = new UsersControllers();
        this.getRoutes()
    }

    getRoutes(){
        this.router
       .get('/', this.controller.getAllUsers)
        .post('/', this.controller.addUser)
        .put('/', this.controller.updateUser)
        .delete('/:id', this.controller.deleteUser)
    }

}