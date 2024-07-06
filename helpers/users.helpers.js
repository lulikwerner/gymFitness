import User from '../models/Users.js'

export default class UsersHelpers{
    parseUser(data){
        const{dni, name, lastname, email, age } = data
        const user = new User(parseInt(dni), name,lastname, email, parseInt(age))

        return user
    }
}