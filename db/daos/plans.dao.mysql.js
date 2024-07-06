import MySql from '../connections/mysql.js';

export default class PlansDaoMysql extends MySql {
    constructor() {
        super();
        this.table = 'plan';
    }

    async getAllPlans() {
        const query = `SELECT * FROM ${this.table}`;
        const [result] = await this.connection.promise().query(query);
        return result;
    }
    
    async addPlan(plan) {
        try {
            const { nombre, precio, duracion } = plan;
            const query = `INSERT INTO ${this.table} (nombre, precio, duracion) VALUES (?, ?, ?)`;
            const [result] = await this.connection.promise().query(query, [nombre, precio, duracion]);
            return result;
        } catch (error) {
            console.error('Error adding plan:', error);
            throw error;
        }
    }
   
    async updatePlan(planId, dataToUpdate) {
        const { nombre, precio, duracion } = dataToUpdate;
    
        const updateFields = [];
        const queryParams = [];
    
        if (nombre !== undefined) {
            updateFields.push('nombre = ?');
            queryParams.push(nombre);
        }
        if (precio !== undefined) {
            updateFields.push('precio = ?');
            queryParams.push(precio);
        }
        if (duracion !== undefined) {
            updateFields.push('duracion = ?');
            queryParams.push(duracion);
        }
    
        queryParams.push(planId); // Agregar el userId al final de los parámetros
    
        const updateQuery = `UPDATE ${this.table} SET ${updateFields.join(', ')} WHERE idplan = ?`;
        try {
            const [result] = await this.connection.promise().query(updateQuery, queryParams);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async deletePlan(id) {
        const query = `DELETE FROM ${this.table} WHERE idplan = ?`;
        const [result] = await this.connection.promise().query(query, [id]);
        return result;
    }
}
