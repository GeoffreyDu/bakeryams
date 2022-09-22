import { PriceModel } from "../models/Price.js"

export const getPrices = async(req, res) => {
    try {
        const prices = await PriceModel.find({})
        res.status(201).json({ prices })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}