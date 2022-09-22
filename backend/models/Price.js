import mongoose from "mongoose"

const { Schema, model } = mongoose

const PriceSchema = new Schema({
    name: { type: String },
    winner: { type: String },
    date: { type: Date, default: new Date() }
})

export const PriceModel = model('prices', PriceSchema)