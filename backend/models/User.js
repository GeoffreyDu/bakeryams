import mongoose from "mongoose";

const { Schema, model } = mongoose

const UserSchema = new Schema({
    username: { type: String, required: true },
    mail: { 
        type: String, 
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Le mail est invalide"
        },
        required: [true, "Mail obligatoire"]
     },
    password: { type: String, required: true },
    gameFinished: { type: Boolean, default: false }
})

export const UserModel = model('users', UserSchema)