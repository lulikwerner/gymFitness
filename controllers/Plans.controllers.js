import { decodeToken } from '../config/jwtUtils.js';
import PlansDaoMysql from '../db/daos/plans.dao.mysql.js'
import PlansHelpers from '../helpers/plans.helpers.js'


export default class PlansControllers {

    constructor() {
        this.db = new PlansDaoMysql()
        this.planHelpers = new PlansHelpers()
    }


    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getAllPlans = async (req, res) => {
        console.log('buscando los entrenadores')
        try {
            // Verificar y decodificar el token JWT del encabezado de autorización
            const token = req.headers.authorization.split(' ')[1]; // Obtener el token del encabezado
            const decodedToken = decodeToken(token);
            const userEmail = decodedToken.email;
            if(userEmail=== process.env.ADMIN_EMAIL){
                const plans = await this.db.getAllPlans()
                res.status(200).json({ plans });
            } else{
                return res.status(403).json({ error: 'No tienes permisos suficientes' });
            }
        } catch (error) {
            console.error('Error al obtener perfil de usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    addPlan = async (req, res) => {
        const plan = this.planHelpers.parsePlan(req.body)
        const result = await this.db.addPlan(plan)
        res.json(result)
    }

    updatePlan = async (req, res) => {
        // const trainerId = req.params.id; // Obtener el ID del usuario de los parámetros de la URL
        const { idPlan, nombre, precio, duracion } = req.body;
        console.log(req.body); // Datos actualizados del usuario: solo plan
    
        // Crear objeto con los datos a actualizar
        const planData = {};
        
        // Actualizar userData con el plan si se proporcionó
        if (nombre) {
            planData.nombre = nombre;
        }

        if (precio) {
            planData.precio = precio;
        }

        if (duracion) {
            planData.duracion = duracion;
        }
    
        try {
            const result = await this.db.updatePlan(idPlan, planData);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Plan no encontrado' });
            }
    
            res.json({ message: 'Plan actualizado con éxito' });
        } catch (error) {
            console.error('Error al actualizar el Plan:', error);
            res.status(500).json({ error: 'Error al actualizar el Plan' });
        }
    };
    
    deletePlan = async (req, res) => {
        const { id } = req.params
        console.log('borrando')
        console.log(id)
        const result = await this.db.deletePlan(id)
        res.json(result)
    }
}

