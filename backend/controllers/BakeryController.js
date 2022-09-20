import { BakeryModel } from "../models/Bakery.js"

export const createBakery = async(req, res) => {
    try {
        const bakery = req.body
        await BakeryModel.create(bakery)
        res.status(201).json({success: "Bakery created"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}