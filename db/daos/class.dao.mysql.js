import MySql from '../connections/mysql.js';

export default class FormDaoMysql extends MySql {
    constructor() {
        super();
        this.table = 'class';
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            idclase INT AUTO_INCREMENT PRIMARY KEY,
            FOREIGN KEY (idpersonal) REFERENCES personal_trainer(idpersonal)
            horaclase TIME,
            dia_semana VARCHAR(20),
            name VARCHAR(100)
        );`
          
        this.connection.query(query);
    }

    async getAllClasses() {
        const query = `SELECT * FROM ${this.table}`;
        const [result] = await this.connection.promise().query(query);
        return result;
    }

    async getClassById(classId) {
        const query = `SELECT * FROM ${this.table} WHERE idclase = ?`;
        try {
            const [rows, fields] = await this.connection.promise().query(query, [classId]);
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching class by id:', error);
            throw error;
        }
    }
    

    async deleteclass(classId) {
        const query = `DELETE FROM ${this.table} WHERE idclase = ?`;
        const [result] = await this.connection.promise().query(query, [classId]);
        return result;
    }
}
