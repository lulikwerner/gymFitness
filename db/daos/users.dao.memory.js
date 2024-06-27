import UsersHelpers from '../../helpers/users.helpers.js'
import usersMock from '../mocks/users.mock.js'

export default class UsersDaoMemory{

    constructor(){
        this.users = usersMock
    }    

getAllUsers(){
    return this.users
}
getUserById(id){
    const result = this.users.find(user => user.id === parseInt(id))
    return result
}

getUserByName(username){
    const result = this.users.find(user => user.username === username)
    return result
}

addUser(user) {
    user = { ...user}
    //user = {id:id++, ...user}
   // this.push(user)
   this.users.push(user);
    return user
}

updateUser(data) {
    let modifyUser = null;
    this.users = this.users.map(user => {
        if (user.id === data.id) {
            modifyUser = data; // Asignar el usuario modificado a modifyUser
            return modifyUser; // Devolver el usuario modificado
        }
        return user; // Devolver el usuario sin cambios
    });
    return modifyUser; // Devolver el usuario modificado como respuesta
}


deleteUser(id) {
    let oldLength = this.users.length
    this.users = this.users.filter(user =>
        user.id !== parseInt(id))
        return oldLength !== this.users.length
}

}