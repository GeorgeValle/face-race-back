import {Schema,model} from 'mongoose';

const supplierSchema = new Schema({

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
    cuit:{
        type:Number,
        unique:true,
        index:true,
        trim:true,
    },
    businessName:{
        type:String,
    },
    companyName:{
        type:String,
    },
    coreBusiness:{
        type:String,
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

export default  model('supplier', supplierSchema);