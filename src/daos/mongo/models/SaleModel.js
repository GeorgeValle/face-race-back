import { Schema, model } from 'mongoose';
import { getNextAutoIncrement } from './AutoIncrement.js';


//import counters from 'mongoose-counters';


//const counter = mongooseCounter(mongoose);

const saleSchema = new Schema({

    saleNumber: {
        type: Number,
        index: true,
        
    },
    payment: {
        type: Array,
        default: []
    },
    itemList: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default:""
    },
    saleDate: {
        type: Date,
    },
    saleTime:{
        type:String
    },
    active: {
        type: Boolean,
        default: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    client: {
        type: Object,
        default: {}
    }


},
    { timestamps: true })

saleSchema.pre('save', async function(next) {
    if (!this.saleNumber) {
        this.saleNumber = await getNextAutoIncrement('sale');
    }
    next();
});

export default model('sale', saleSchema);