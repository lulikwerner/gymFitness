import MySql from '../connections/mysql.js'

export default class UsersDaoMysql extends MySql {

    constructor() {
        super()
        this.table = 'users'
        this.#createTable()
    }

    #createTable(){
        const query = `CREATE TABLE IF NOT EXISTS ${this.table}(
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            age INT NOT NULL
        )`
        this.connection.query(query)
    }
    async getAllUsers() {
        const query = `SELECT * FROM ${this.table}`;
        const [result] = await this.connection.promise().query(query)//CON [RESULT] TRAIGO LA PRIMERA POSICIONS
        console.log(result)
        return result
    }

    async addUser(user) {
        try {
            const { name, email, age } = user;
            const query = `INSERT INTO ${this.table} (name, email, age) VALUES (?, ?, ?)`;
            console.log('elquery',query)
            const [result] = await this.connection.promise().query(query, [name, email, age]);
            console.log('ensql', result)
            return result;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }

    async updateUser(data) {
        const { id, name, email, age } = data;
        const query = `UPDATE ${this.table} SET name = ?, email = ?, age = ? WHERE id = ?`;
        const [result] = await this.connection.promise().query(query, [name, email, age, id]);
        console.log('elll', result);
        return result;
    }
    
    


   async deleteUser(id) {
    const query = `DELETE FROM ${this.table} WHERE ID = ${id}`;
    const [result] = await this.connection.promise().query(query)
    return result
    }

}