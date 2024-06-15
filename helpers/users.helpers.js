import User from '../models/Users.js'

export default class UsersHelpers{
    parseUser(data){
        console.log(data)
        const{ID, name, email, age } = data
        console.log(typeof User)
        const user = new User(parseInt(ID), name, email, parseInt(age))

        return user
    }
}