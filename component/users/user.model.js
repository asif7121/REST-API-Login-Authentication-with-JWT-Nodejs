import { Schema, model as Model } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{
    versionKey: false,
    timestamps: true
})

const User = Model('User', userSchema);
export default User;