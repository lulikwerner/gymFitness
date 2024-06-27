import MySql from '../connections/mysql.js';

export default class UsersDaoMysql extends MySql {
    constructor() {
        super();
        this.table = 'users';
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            age INT NOT NULL
        )`;
        this.connection.query(query);
    }

    async getAllUsers() {
        const query = `SELECT * FROM ${this.table}`;
        const [result] = await this.connection.promise().query(query);
        return result;
    }

    async getUserById(id) {
        const query = `SELECT * FROM ${this.table} WHERE id = ?`;
        try {
            const [rows, fields] = await this.connection.promise().query(query, [id]);
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    }
/**
 * Agrega el usuario a la bd
 * @param {{name:string, email:string, age:int, password:string}} user Datos recibidos del usuario
 * @returns {boolean}
 */
    async addUser(user) {
        try {
            const { name, email, age } = user;
            const query = `INSERT INTO ${this.table} (name, email, age, password) VALUES (?, ?, ?,?)`;
            const [result] = await this.connection.promise().query(query, [name, email, age, password]);
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
        return result;
    }

    async deleteUser(id) {
        const query = `DELETE FROM ${this.table} WHERE ID = ?`;
        const [result] = await this.connection.promise().query(query, [id]);
        return result;
    }
}
