import MySql from '../connections/mysql.js';

export default class ClassesDaoMysql extends MySql {
    constructor() {
        super();
        this.table = 'usersClass';
    }

    async getClasses(id){
        const query = `SELECT p.nombre, p.apellido, c.idclase, c.horaclase, c.dia_semana, c.name FROM ${this.table} u
         INNER JOIN class c ON c.idclase = u.idclase INNER JOIN personal_trainer p ON p.idpersonal = c.idpersonal
         WHERE u.iduser = ?`;
        const [result] = await this.connection.promise().query(query, [id]);
        return result;
    }

    async addClass(id, classId) {
        const query = `INSERT INTO ${this.table} (iduser, idclase) VALUES (?, ?)`;
        try {
            const [result] = await this.connection.promise().query(query, [id, classId]);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async deleteClass(id){
        const query = `
                        DELETE u FROM usersClass u
                        INNER JOIN class c ON c.idclase = u.idclase
                        WHERE u.idclase = ?
                    `;
        const [result] = await this.connection.promise().query(query, [id]);
        return result;
    }
}