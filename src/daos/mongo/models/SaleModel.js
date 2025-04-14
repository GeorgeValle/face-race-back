import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

import mongooseCounter from 'mongoose-counters';


const counter = mongooseCounter(mongoose);

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
    },
    saleDate: {
        type: Date,
    },
    saleTime:{
        type:Date
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

    saleSchema.plugin(counter, { Field: 'saleNumber' });

export default model('sale', saleSchema);