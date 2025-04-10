//Dotenv config
import dotenv from 'dotenv';
dotenv.config();

import Envs from "./src/config/Envs.js"

//Config server Express
import express from 'express';


//import of passport
import passport from 'passport';
import cookieParser from "cookie-parser";
//import routes
import clientRouter from "./src/routes/ClientRouter.js"
import sessionRouter from "./src/routes/SessionRouter.js"
import supplierRouter from "./src/routes/SupplierRouter.js"
import itemRouter from "./src/routes/ItemRouter.js"
import appointmentRouter from "./src/routes/AppointmentRouter.js"
import saleRouter from "./src/routes/SaleRouter.js"

//cors
import cors from "cors";
import initializatePassport from "./src/config/PassportConfig.js"


const PORT = parseInt(process.argv[2]) || Envs.PORT || 8080
const modoCluster = process.argv[3] == 'CLUSTER'

const app = express();

if (modoCluster && cluster.isPrimary) {
    const numCPUs = cpus().length

    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
} else {


    const server = app.listen(PORT, () => {
        console.log(`listening on ${PORT}`)
        console.log(`PID WORKER ${process.pid}`)
    });

    server.on('error', error => console.log(`error in server: ${error} `));

    //middleware of json
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    //cors middleware
    app.use(cors());

    //Mongo-conect configuration
    // app.use(
    //     session({
    //         store: MongoStore.create({
    //             mongoUrl: Envs.MONGO_URI,
    //             dbName: Envs.MONGO_DATABASE,
    //             ttl: Envs.TTL,
    //         }),
    //         secret: Envs.SECRET_MONGO_STORE,
    //         resave: true,
    //         saveUninitialized: true,
    //     })
    // );


    app.use(cookieParser("keyCookieJobsRoad"));
    initializatePassport();
    app.use(passport.initialize());
    //****app.use(passport.session()); 

    app.use("/api/session", sessionRouter);
    app.use("/api/client", clientRouter);
    app.use("/api/supplier", supplierRouter);
    app.use("/api/item", itemRouter);
    app.use("/api/appointment", appointmentRouter);
    app.use("/api/sale", saleRouter);

     //message for inexistent routes
    app.use((req, res) => {
        res.status(404).json({error: -2, description: `route ${req.baseUrl}${req.url} method ${req.method} not implemented`});
    });

    app.use((error, req , res, next)=>{
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    })

}

