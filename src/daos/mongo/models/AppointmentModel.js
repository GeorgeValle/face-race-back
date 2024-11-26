import {Schema,model} from 'mongoose';

const appointmentSchema = new Schema({

    client: { 
        type: Schema.Types.ObjectId,
        ref: 'client', // reference model name
        index:true,
        required: true 
        },
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