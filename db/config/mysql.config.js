import dotenv from 'dotenv'
dotenv.config();
const config ={
    host: process.env.HOST_SQL,
    user: process.env.USER_SQL,
    password: process.env.PASSWORD_SQL,
   // port: 3307,//3306
    database: process.env.DB_SQL
}
/*onst config ={
    host: 'localhost',//ruta del servidor cuando lo suba
    user: 'root',
    password: '',
    port: 3307,//3306
    database: 'FitnessGym'
}*/

export default config

