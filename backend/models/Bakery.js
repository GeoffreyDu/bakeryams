import mongoose from "mongoose"

const { Schema, model } = mongoose

const BakerySchema = new Schema({
    name: { type: String, unique: true },
    quantity: { type: Number },
    available: { type: Boolean, default: true }
})

export const BakeryModel = model('bakeries', BakerySchema)