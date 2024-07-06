import Plan from '../models/Plans.js'

export default class PlansHelpers{
    parsePlan(data){
        const { nombre, precio, duracion } = data
        const plan = new Plan(nombre, parseFloat(precio), duracion)

        return plan
    }
}