// This File helpus to homogenize the name of DAOS variables.
import envs from "../config/Envs.js";
import mongoose from "mongoose";

let  UserDAO, ClientDAO;

switch (envs.PERSISTENCE) {
  case "MONGO":
    const uri= envs.MONGO_URI
    const ear= mongoose.connection;

    mongoose.connect(uri,
        {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    }).catch(err => {console.log(err)})
    
    ear.once('open',_=>{
        console.log(`Mongo Database is connected to: `, uri)
    })

    ear.on('error', err => {console.log(`Type error: ${err}`)})

    
    const { default: UserMongo } = await import ('./mongo/UserMongo.js')
    const { default: ClientMongo } = await import ('./mongo/ClientMongo.js')

    ClientDAO = ClientMongo;
    UserDAO = UserMongo;
    break;
  default:
    break;
}

export {UserDAO,ClientDAO}