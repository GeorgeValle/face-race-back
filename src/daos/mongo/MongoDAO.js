// This Class have patterns of encapsulated methods for mongo
class MongoDAO {
    constructor(options) {
        this.collection = options
    }

    saveDataDAO = async obj => {
        try {
            let objDAO = await this.collection.create(obj);
            return objDAO

        }
        catch (err) {
            console.log(err)
        }
    }

    getAllDAO = async () => {
        try {
            let objDAO = await this.collection.find({});
            return objDAO;
        }
        catch (err) {
            console.log(err.message);
        }
    }

    getByIdDAO = async id => {
        try {

            let objDAO = await this.collection.findById(id);
            if (objDAO[0] == undefined) throw new Error();
            return objDAO;
        } catch (err) {
            console.log(err.message);
        }
    }

    getByFieldDAO = async field => {
        try {

            let objDAO = await this.collection.find(field).exec()
            return objDAO
        } catch (err) {
            console.log(err.message);
        }
    }

    getOneByFieldDAO = async field => {
        try {

            let objDAO = await this.collection.findOne(field);

            return objDAO

        } catch (err) {
            console.log("objDAo: " + err.message);
        }
    }

    updateByIdDAO = async (obj, id) => {
        try {
            let objDAO = await this.collection.findByIdAndUpdate(id, obj, { new: true });

            return objDAO

        } catch (err) {
            console.log(err.message);
        }
    }

    updateOneDao = async (obj, condition) => {
        //condition must be an objet example: {_id:id}
        try {
            let objDAO = await this.collection.findOneAndUpdate(
                condition,
                { $set: obj },
                { new: true }
            );
            return objDAO
        }
        catch (err) {
            console.log(err.message);
        }
    }

    deleteByIdDAO = async (id) => {
        try {
            let objDAO = await this.collection.findByIdAndDelete(id);
            return objDAO;
            
        } catch (err) {
            console.log(err.message);
        }
    }

    deleteByFieldDAO = async (field) => {
        try {
            let objDao = await this.collection.deleteOne(field);
            if (objDao.deletedCount > 0){ 
                return true
            }else{ return false};
        } catch (error) {
            return error
        }
    }


    updateOneFieldById = async (id, fieldUpdate) => {
        try {

            //updates = have field update
            const updatedResult = await this.collection.findByIdAndUpdate(
                { _id: id },
                {
                    fieldUpdate
                },
                {
                    new: true
                }
            );
            console.log(updatedResult);


        } catch (err) {

        }
    }

    updateByFieldDAO = async (field, fieldUpdate,) => {
        try {

            const res = await this.collection.findOneAndUpdate(field, fieldUpdate, {
                new: true,
            });
            //return modified field
            //console.log(res);
            return true;

        } catch (err) {

        }

    }

    incrementOneFieldDAO = async (field, fieldUpdate) => {
        try {
            await this.collection.findOneAndUpdate(field,
                //{'field' : dataFieldUpdate}
                { $inc: fieldUpdate },
                //{new: true} 
                
            );
                return true;
        } catch (err) {

        }
    }

    incrementOneFieldById = async (id, fieldUpdate) => {
        try {

            await this.collection.findByIdAndUpdate(
                id,
                // example: fieldUpdate ={ goals: { $inc: 1 } }
                fieldUpdate,
                //{new: true}
            );
        } catch (err) {

        }
    }

    resetAllDAO = async (fieldsUpdated) => {
        try {
            // example: fieldUpdate ={ goals: 0,wins:0,points:0}
            const reset = await this.collection.updateMany({}, { fieldsUpdated })
            //obtain the count of documents modified
            return reset.modifiedCount

        } catch (err) {

        }
    }

}
export { MongoDAO }