import MySql from '../connections/mysql.js';

export default class UsersDaoMysql extends MySql {
    constructor() {
        super();
        this.table = 'users';
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            dni INT NOT NULL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            lastname VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            age INT NOT NULL,
            password VARCHAR(100) NOT NULL,
            imagen VARCHAR(255)
        )`;
        this.connection.query(query);
    }

    async getAllUsers() {
        const query = `SELECT * FROM ${this.table}`;
        const [result] = await this.connection.promise().query(query);
        return result;
    }

    async getUserByEmail(email) {
        const query = `SELECT * FROM ${this.table} WHERE email = ?`;
        try {
            const [rows, fields] = await this.connection.promise().query(query, [email]);
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching user by DNI:', error);
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
            const { dni, name, lastname, email, age, password } = user;
            const query = `INSERT INTO ${this.table} (dni, name, lastname, email, age, password) VALUES (?, ?, ?,?, ?, ?)`;
            const [result] = await this.connection.promise().query(query, [dni, name,lastname, email, age, password]);
            return result;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }

    async updateUser(data) {
        const { dni, name, lastname, email, age } = data;
        const query = `UPDATE ${this.table} SET name = ?,lastname = ?, email = ?, age = ? WHERE dni = ?`;
        const [result] = await this.connection.promise().query(query, [name, lastname, email, age, dni]);
        return result;
    }

    async deleteUser(dni) {
        const query = `DELETE FROM ${this.table} WHERE dni = ?`;
        const [result] = await this.connection.promise().query(query, [dni]);
        return result;
    }
}
