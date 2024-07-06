import ClassesDaoMysql from '../db/daos/classes.dao.mysql.js'

export default class ClassesControllers {

    constructor() {
        this.db = new ClassesDaoMysql()
    }
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */

    getClass = async (req, res) => {
        const { id } = req.params;
        console.log('los params', req.params); 
        try {
            const result = await this.db.getClasses(id);
            console.log(result);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.json({ message: 'Clase obtenida con éxito', result });
        } catch (error) {
            console.error('Error al mostrar la clase:', error);
            res.status(500).json({ error: 'Error al mostrar la clase' });
        }
    };
    
    updateClass = async (req, res) => {
        const { id, classId } = req.params;
        console.log('los params', req.params); 
        try {
            const result = await this.db.addClass(id, classId);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.json({ message: 'Clase actualizada con éxito', result });
        } catch (error) {
            console.error('Error al actualizar la clase:', error);
            res.status(500).json({ error: 'Error al actualizar la clase' });
        }
    };
}

