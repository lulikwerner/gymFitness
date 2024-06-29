import User from '../models/Users.js'

export default class UsersHelpers{
    parseUser(data){
        console.log(data)
        const{dni, name, lastname, email, age } = data
        console.log(typeof User)
        const user = new User(parseInt(dni), name,lastname, email, parseInt(age))

        return user
    }
}