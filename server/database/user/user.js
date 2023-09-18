import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    tasks:
        {
            type: mongoose.Types.ObjectId,
            ref: "Notes",
        }
    
},
{
    timestamps: true
});

export const UserModel = mongoose.model("Users", UserSchema);