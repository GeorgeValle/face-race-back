import { Schema, model } from 'mongoose';

const autoIncrementCollection = 'autoIncrement';

const autoIncrementSchema = new Schema({
    counterCollection: String,
    value: Number
});

const AutoIncrement = model(autoIncrementCollection, autoIncrementSchema);

async function getNextAutoIncrement(collectionName) {
    const doc = await AutoIncrement.findOneAndUpdate(
    { counterCollection: collectionName },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
    );
        return doc.value;
}

export { getNextAutoIncrement };