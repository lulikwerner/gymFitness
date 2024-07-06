import Trainer from '../models/Trainers.js'

export default class TrainersHelpers{
    parseTrainer(data){
        const { nombre, apellido, especialidad, descripcion, precio } = data
        const trainer = new Trainer(nombre, apellido, especialidad, descripcion, parseFloat(precio))
        return trainer
    }
}