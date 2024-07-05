import Trainer from '../models/Trainers.js'

export default class TrainersHelpers{
    parseTrainer(data){
        console.log(data)
        const { nombre, apellido, especialidad, descripcion, precio } = data
        console.log(typeof Trainer)
        const trainer = new Trainer(nombre, apellido, especialidad, descripcion, parseFloat(precio))

        return trainer
    }
}