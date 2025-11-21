import {Schema,model} from 'mongoose';

const clientSchema = new Schema({

    email:{
        type: String,
        lowercase: true,
        trim: true,
        index:true,
        unique:true,
        validate: {
        validator: function(value) {
            return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: 'Invalid email format'}
    },
    dni:{
        type:Number,
        unique:true,
        index:true,
        trim:true,
    },
    name:{
        type:String,
        trim: true,
        index:true,
    },
    surname:{
        type:String,
        trim: true,
        index:true,
    },
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    province:{
        type:String,
    },
    postalCode:{
        type:Number,
    },
    phone:{
        type:Number,
    },
    cel:{
        type:Number,
    },
    description:{
        type:String,
    }
},
    {timestamps: true})

export default  model('client', clientSchema);