import {Schema,model} from 'mongoose';

const itemSchema = new Schema({

    code:{
        type: Number,
        trim: true,
        index:true,
        unique:true,
    },
    name:{
        type: String,
        lowercase: true,
        trim: true,
        index:true,
    },
    stockQuantity:{
        type:Number,
        default: 0,
    },
    price:{
        type:Number,
        default: 0.00,
    },
    category:{
        type:String,
        enum: ['Indumentaria', 'Protección Personal', 'Equipaje', 'Lingas y Trabas', 'Luces', 'Cobertores','Redes y sujetadores','Parlantes','Parabrisas','Herramientas','Emblemas','Tableros y Velocimetros','Pisadores','Escapes','Frenos','Repuestos','Servicios','Otros'],
    },
    brand:{
        type:String,
        default:"Generica"
    },
    model:{
        type:String,
    },
    origin:{
        type:String,
        
    },
    warehouseLocation:{
        type:String,
    },
    description:{
        type:String,
    }
},
    {timestamps: true})

export default  model('item', itemSchema);