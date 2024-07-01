import MySql from '../connections/mysql.js';

export default class FormDaoMysql extends MySql {
    constructor() {
        super();
        this.table = 'form';
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            idform INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(50) NOT NULL,
            apellido VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            telefono VARCHAR(20),
            mensaje TEXT,
            plan ENUM ('Basic','Gold','Platinum'),
            conocio ENUM ('Publicidad','Amigos','Internet'),
            imagen VARCHAR(100)
        );`
          
        this.connection.query(query);
    }

    async getAllForms() {
        const query = `SELECT * FROM ${this.table}`;
        const [result] = await this.connection.promise().query(query);
        return result;
    }

    async getFormByEmail(email) {
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
 * Agrega el Formulario a la bd
 * @param {{name:string, lastname:string email:string, telephone:int, message:string plan:string, radio:string, imagen:string}} user Datos recibidos desde el contact form
 * @returns {boolean}
 */
async addForm(form) {
    try {
        const { name, lastname, email, telephone, message, plan, radio, imagen } = form;
        const query = `INSERT INTO ${this.table} (nombre, apellido, email, telefono, mensaje, plan, conocio, imagen) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await this.connection.promise().query(query, [name, lastname, email, telephone, message, plan, radio, imagen]);
        return result;
    } catch (error) {
        console.error('Error adding form:', error);
        throw error;
    }
}

   
    async updateForm(contactId, dataToUpdate) {

    }
    
    

    async deleteForm(id) {
        const query = `DELETE FROM ${this.table} WHERE idform = ?`;
        const [result] = await this.connection.promise().query(query, [id]);
        return result;
    }
}
