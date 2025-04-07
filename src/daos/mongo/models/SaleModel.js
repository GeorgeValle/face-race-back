import { Schema, model } from 'mongoose';

import sequence from 'mongoose-sequence';

const saleSchema = new Schema({

    saleNumber: {
        type: Number,
        index: true,
        unique: true,
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

const sequencePlugin = sequence(mongoose);
saleSchema.plugin(sequencePlugin, {
    field: 'numberSale',
    startAt: 4012,
    incrementBy: 1,
    id: 'sale_number'
});



sequencePlugin.createSequence('sale_number', (err, sequence) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Secuencia creada');
    }
});

export default model('sale', saleSchema);