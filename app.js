import Server from './server/Server.js'
import dotenv from 'dotenv'

dotenv.config();

const port = process.env.PORT || 8080;
const server = new Server();
server.run(port);
//console.log(process.env)
//console.log(process.argv)