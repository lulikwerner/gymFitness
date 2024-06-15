import Routes from './Routes.js'

export default class ProductsRoutes extends Routes{
    constructor(){
        super() //es para poder extender de Routes y usar eso
        this.getRoutes()
    }

    getRoutes(){
        this.router
        .get('/', (req,res) => {
            res.send('hola soy producto');
        })
        .post('/', (req,res) => {})
        .put('/', (req,res) => {})
        .delete('/', (req,res) => {})
    }
}