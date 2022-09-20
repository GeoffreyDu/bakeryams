import mongoose from "mongoose"

const { Schema, model } = mongoose

const EndGameSchema = new Schema({
    name: { type: String, unique: true },
    quantity: { type: Number, default: 0 },
    endgame: { type: Boolean, default: false }
})

export const EndGameModel = model('endgames', EndGameSchema)