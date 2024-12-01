import {Schema,model} from 'mongoose';

const appointmentSchema = new Schema({

    client: { 
        type: Schema.Types.ObjectId,
        ref: 'client', // reference model name
        index:true,
        required: true 
        },
    // person:{
    //     type:String,
    //     required:true
    // },
    // phone: {
    //     type: numbe
    // },
    // email: {
    //     type: String,
    //     lowercase: true,
    //     trim: true,
    //     unique:true,
    //     validate: {
    //     validator: function(value) {
    //         return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
    //         },
    //         message: 'Invalid email format'}
    // },
    // dni:{
    //     type:Number,
    //     unique:true,
    //     index:true,
    //     trim:true,
    // },
    shiftDate: { 
            type: Date,
            index:true,
            required: true },// date of work
    timeSlot:{
        type:String, // hour of work
        enum:['10-12','13-15','16-18']
    }
    
},
    {timestamps: true})

export default  model('appointment', appointmentSchema);