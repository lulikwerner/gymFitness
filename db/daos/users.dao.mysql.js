import MySql from '../connections/mysql.js';

export default class UsersDaoMysql extends MySql {
    constructor() {
        super();
        this.table = 'users';
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            iduser INT AUTO_INCREMENT PRIMARY KEY,
            dni INT NOT NULL UNIQUE,
            name VARCHAR(100) NOT NULL,
            lastname VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            age INT NOT NULL,
            password VARCHAR(100) NOT NULL,
            imagen VARCHAR(255),
            fk_idplan INT NOT NULL DEFAULT 1,
            FOREIGN KEY (fk_idplan) REFERENCES plan(idplan)
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
            console.error('Error fetching user by email:', error);
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
   
    async updateUser(userId, dataToUpdate) {
        const { plan, imagen } = dataToUpdate;
        console.log('imagen',imagen)
        console.log('data a actualizar', dataToUpdate);
    
        const updateFields = [];
        const queryParams = [];
    
        if (plan !== undefined) {
            updateFields.push('fk_idplan = ?');
            queryParams.push(plan);
        }
    
        if (imagen !== undefined) {
            if (imagen === '') {
                updateFields.push('imagen = ?');
                queryParams.push('assets/img/users/persona.jpg'); // Ruta de imagen por defecto si no se proporciona ninguna
            } else {
                updateFields.push('imagen = ?');
                queryParams.push(imagen);
            }
        }
    
        queryParams.push(userId); // Agregar el userId al final de los parámetros
    
        const updateQuery = `UPDATE ${this.table} SET ${updateFields.join(', ')} WHERE iduser = ?`;
    
        try {
            const [result] = await this.connection.promise().query(updateQuery, queryParams);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    
    
    
    
    
    
    
    

    async deleteUser(id) {
        const query = `DELETE FROM ${this.table} WHERE iduser = ?`;
        const [result] = await this.connection.promise().query(query, [id]);
        return result;
    }
}
