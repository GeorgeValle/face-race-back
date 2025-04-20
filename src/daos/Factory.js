// This File help's to homogenize the name of DAOS variables.
import envs from "../config/Envs.js";
import mongoose from "mongoose";

let  UserDAO, ClientDAO, SupplierDAO, ItemDAO, AppointmentDAO, SaleDAO;

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
    const { default: SupplierMongo } = await import ('./mongo/SupplierMongo.js')
    const { default: ItemMongo } = await import ('./mongo/ItemMongo.js')
    const { default: AppointmentMongo } = await import ('./mongo/AppointmentMongo.js')
    const { default: SaleMongo } = await import ('./mongo/SaleMongo.js')
    ClientDAO = ClientMongo;
    UserDAO = UserMongo;
    SupplierDAO = SupplierMongo;
    ItemDAO = ItemMongo;
    AppointmentDAO = AppointmentMongo;
    SaleDAO = SaleMongo;
    break;
  default:
    break;
}

export {UserDAO,ClientDAO,SupplierDAO,ItemDAO,AppointmentDAO,SaleDAO}