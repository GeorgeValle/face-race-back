import {Schema,model} from 'mongoose';

const userSchema = new Schema({
    email: {
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
    password: { 
            type: String,
            trim: true,
            select: true,
            required: [true, "can't be blank"],
            
        },

    name:{
        type: String,
        trim: true,
        required: true
    },
    surname:{
        type:String,
        required: true
        },
    lastLogin:{
        type:String,
        default:new Date().toLocaleDateString()
        
    },
    inactive:{
        type: Boolean,
        default: false
    },
    role:{
        type:String,
        default:'Normal',
        enum: ['Normal', 'Recuiter', 'Admin']
    },
    //status the email verified or not
    status:{
        type: String,
        default: "not verified"
    }

},


    {timestamps: true})

export default  model('user', userSchema);