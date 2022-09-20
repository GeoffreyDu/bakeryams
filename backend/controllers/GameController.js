import mongoose from "mongoose"
import { BakeryModel } from "../models/Bakery.js"
import { EndGameModel } from "../models/EndGame.js"
import { limit } from '../config/index.js'
import pastries from "../data/pastries.js"
import endgame from "../data/endgame.js"

// reset the game
export const resetGame = async(req, res) => {
    try {
        await mongoose.connection.db.dropCollection('endgames')
        await mongoose.connection.db.dropCollection('bakeries')
        await EndGameModel.create(endgame)
        await BakeryModel.insertMany(pastries)
        res.status(200).json({ success: 'game reset' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

// start the game
export const rollTheDice = async(req, res) => {
    try {
        const hand = []
        for (let i = 0; i < 5; i++) {
            const num = Math.floor(Math.random() * 6) + 1
            hand.push(num)
        }
    
        const occByNumber = countOccByNumber(hand)
        const result = gameResult(occByNumber)
        const end = await actionAfterResult(result)
        res.json({ end, hand, result })
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// give occurrences by number of dice
const countOccByNumber = (hand) => {
    let counter = {}
    for (const element of hand) {
        if (counter[element]) {
            counter[element] += 1
        } else {
            counter[element] = 1
        }
    }
    return counter
}

// give interpretation of dice results
const gameResult = (occByNumber) => {
    let count = 0
    for (const key in occByNumber) {
        if (occByNumber[key] === 5) return 'yams'
        else if( occByNumber[key] === 4) return 'carré'
        else if(occByNumber[key] === 2) count++
    }

    if (count >= 2) {
        return 'double paires'
    }
    else {
        return 'perdu'
    }
}

// helper to update quantity of pastries (used in actionAfterResult function)
const updateBakeryQuantity = async(turn) => {
    const prices = [new Date().toISOString().replace('T', ' ').slice(0, -5)]
    try {
        const listOfBakeries = await BakeryModel.find({ available: true }, { _id: 0, name: 1 })
        if(listOfBakeries.length < 1){
            return 'plus de stock'
        }
        for (let index = 0; index < turn; index++) {
            let name = listOfBakeries[Math.floor(Math.random() * listOfBakeries.length)].name
            let elToUpdate = await BakeryModel.find({name})
            prices.push(elToUpdate[0].name)
            if(elToUpdate[0].quantity === 0 && listOfBakeries.length > 1) {
                elToUpdate[0].available = false
                await elToUpdate[0].save()
                await updateBakeryQuantity(1)
            }
            else {
                elToUpdate[0].quantity--
                await elToUpdate[0].save()
            }
        }
        return prices   
    } catch (error) {
        return error.message
    }
}

// With result make actions corresponding in db
const actionAfterResult = async(result) => {
    const end = await EndGameModel.find({ name: 'total' })
    const rest = limit - end[0].quantity
    if (result === 'perdu') return { 
        end: end[0].endgame, prix: []
     }
    else {
        if(end[0].quantity >= limit) {
            end[0].endgame = true
            await end[0].save()
            return { end: end[0].endgame, prix: [] }
        }
       if (result === 'yams') {
            const prices = await updateBakeryQuantity(3)
            end[0].quantity+=3
            await end[0].save()
            return { end: end[0].endgame, prix: prices }
        }
        else if (result === 'carré'){
            const prices = await updateBakeryQuantity(2)
            end[0].quantity+=2
            await end[0].save()
            return { end: end[0].endgame, prix: prices }
        }
        else if (result === 'double paires') {
            const prices = await updateBakeryQuantity(1)
            end[0].quantity+=1
            await end[0].save()
            return { end: end[0].endgame, prix: prices }
        } 
    }
}