import Plan from '../models/Plans.js'

export default class PlansHelpers{
    parsePlan(data){
        console.log(data)
        const { nombre, precio, duracion } = data
        console.log(typeof Plan)
        const plan = new Plan(nombre, parseFloat(precio), duracion)

        return plan
    }
}