import UsersDaoMemory from '../db/daos/users.dao.memory.js'
import UsersDaoMysql from '../db/daos/users.dao.mysql.js'
import UsersHelpers from '../helpers/users.helpers.js'


export default class UsersControllers{

    constructor(){
        if(process.argv[2] === 'dev')
        this.db = new UsersDaoMemory()
        if(process.argv[2] === 'prod')
        this.db = new UsersDaoMysql()   

        this.userHelpers = new UsersHelpers()
    }
    getAllUsers = async(req, res) => {
        const users = await this.db.getAllUsers()
        res.json(users)
    }
    
    addUser = async (req,res) => {
        const user = this.userHelpers.parseUser(req.body)
        const result = await this.db.addUser(user)
        console.log('elreu',result)
        res.json(result)
    }
    
    updateUser = async (req, res) => {
        const user = this.userHelpers.parseUser(req.body);
        const result = await this.db.updateUser(user);
        res.json(result); // Devuelve el usuario modificado como respuesta
    }
    
    
    
    deleteUser = async (req,res) => {
        const {id} =req.params
        const result =  await this.db.deleteUser(id)
        res.json(result)
    }
}
   
