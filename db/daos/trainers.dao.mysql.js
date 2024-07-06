import MySql from '../connections/mysql.js';

export default class TrainersDaoMysql extends MySql {
    constructor() {
        super();
        this.table = 'personal_trainer';
    }

    async getAllTrainers() {
        const query = `SELECT * FROM ${this.table}`;
        const [result] = await this.connection.promise().query(query);
        return result;
    }
    
    async addTrainer(trainer) {
        try {
            const { nombre, apellido, especialidad, descripcion, precio, imagen } = trainer;
            const query = `INSERT INTO ${this.table} (nombre, apellido, especialidad, descripcion, precio, imagen) VALUES (?, ?, ?, ?, ?, "public/assets/img/users/persona.webp")`;
            const [result] = await this.connection.promise().query(query, [nombre, apellido, especialidad, descripcion, precio, imagen]);
            return result;
        } catch (error) {
            console.error('Error adding trainer:', error);
            throw error;
        }
    }
   
    async updateTrainer(trainerId, dataToUpdate) {
        const { nombre, apellido, especialidad, descripcion, precio, imagen } = dataToUpdate;
    
        const updateFields = [];
        const queryParams = [];
    
        if (nombre !== undefined) {
            updateFields.push('nombre = ?');
            queryParams.push(nombre);
        }
        if (apellido !== undefined) {
            updateFields.push('apellido = ?');
            queryParams.push(apellido);
        }
        if (especialidad !== undefined) {
            updateFields.push('especialidad = ?');
            queryParams.push(especialidad);
        }
        if (descripcion !== undefined) {
            updateFields.push('descripcion = ?');
            queryParams.push(descripcion);
        }
        if (precio !== undefined) {
            updateFields.push('precio = ?');
            queryParams.push(precio);
        }
        if (imagen !== undefined) {
            if (imagen !== '') {
                updateFields.push('imagen = ?');
                queryParams.push(imagen);
            }
        }
    
        queryParams.push(trainerId); // Agregar el userId al final de los parámetros
    
        const updateQuery = `UPDATE ${this.table} SET ${updateFields.join(', ')} WHERE idpersonal = ?`;
        try {
            const [result] = await this.connection.promise().query(updateQuery, queryParams);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async deleteTrainer(id) {
        const query = `DELETE FROM ${this.table} WHERE idpersonal = ?`;
        const [result] = await this.connection.promise().query(query, [id]);
        return result;
    }
}
