import {Schema,model} from 'mongoose';

const reconditioningSchema = new Schema({

    
    person:{
        type:String,
        required:true
    },
    phone: {
        type:Number
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        validate: {
        validator: function(value) {
            return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: 'Invalid email format'}
    },
    dni:{
        type:Number,
        index:true,
        trim:true,
    },
    shiftDate: { 
            type: Date,
            index:true,
            required: true },// date of work
    timeSlot:{
        type:String, // hour of work
        enum:['10-12','13-15','16-18']
    },
    status:{
        type:String,
        enum:['pending','canceled','ready','delivered'],
        default:'pending'
    },
    description:{
        type:String,
        default:''
    }
},
    {timestamps: true})

export default  model('reconditioning', reconditioningSchema);