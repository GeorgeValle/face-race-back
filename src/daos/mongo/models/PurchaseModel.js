import { Schema, model } from 'mongoose';
import { getNextAutoIncrement } from './AutoIncrement.js';


const purchaseSchema = new Schema({

    purchaseNumber: {
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
    purchaseDate: {
        type: Date,
    },
    active: {
        type: Boolean,
        default: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    supplier: {
        type: Object,
        default: {}
    },
    status:{
        type: String,
        enum: ["shipped","Partially","Complete","draft","dispute","cancelled","processing","refunded","failed","others"],
        default:"processing",
        require:true    
    }


},
    { timestamps: true })

    purchaseSchema.pre('save', async function(next) {
    if (!this.purchaseNumber) {
        this.purchaseNumber = await getNextAutoIncrement('purchase');
    }
    next();
});

export default model('purchase', purchaseSchema);