import mongoose from "mongoose"
import { BakeryModel } from "../models/Bakery.js"
import { EndGameModel } from "../models/EndGame.js"
import { limit } from '../config/index.js'
import pastries from "../data/pastries.js"
import endgame from "../data/endgame.js"
import { UserModel } from "../models/User.js"
import { PriceModel } from "../models/Price.js"

// reset the game
export const resetGame = async(req, res) => {
    try {
        await mongoose.connection.db.dropCollection('endgames')
        await mongoose.connection.db.dropCollection('bakeries')
        await mongoose.connection.db.dropCollection('prices')
        await EndGameModel.create(endgame)
        await BakeryModel.insertMany(pastries)
        await UserModel.updateMany({ gameFinished: true }, { gameFinished: false })
        res.status(200).json({ success: 'game reset' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

// start the game
export const rollTheDice = async(req, res) => {
    try {
        const { userId } = req.auth
        const user = await UserModel.findOne({ _id: userId })
        if (user && !user.gameFinished) {
            await UserModel.updateOne({ _id: userId }, { gameFinished: true })
            const hand = []
            for (let i = 0; i < 5; i++) {
                const num = Math.floor(Math.random() * 6) + 1
                hand.push(num)
            }
            const winner = user.username
            const occByNumber = countOccByNumber(hand)
            const result = gameResult(occByNumber)
            const end = await actionAfterResult(result, winner)
            res.json({ result, end, hand })
        }
        else {
            res.status(401).json({ error: 'Vous avez déjà participé' })
        }
        
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
const updateBakeryQuantity = async(turn, winner) => {
    const prices = []
    try {
        const listOfBakeries = await BakeryModel.find({ available: true }, { _id: 0, name: 1 })
        if(listOfBakeries.length < 1){
            return 'plus de stock'
        }
        for (let index = 0; index < turn; index++) {
            let name = listOfBakeries[Math.floor(Math.random() * listOfBakeries.length)].name
            let elToUpdate = await BakeryModel.findOne({name})
            // Ajouter dans la nouvelle table
            let price = {
                name: elToUpdate.name,
                winner: winner,
                date: new Date()
            }
            await PriceModel.create(price)

            prices.push(elToUpdate.name)
            if(elToUpdate.quantity === 0 && listOfBakeries.length > 1) {
                elToUpdate.available = false
                await elToUpdate.save()
                await updateBakeryQuantity(1)
            }
            else {
                elToUpdate.quantity--
                await elToUpdate.save()
            }
        }
        return prices   
    } catch (error) {
        return error.message
    }
}

// With result make actions corresponding in db
const actionAfterResult = async(result, winner) => {
    const end = await EndGameModel.findOne({ name: 'total' })
    const rest = limit - end.quantity
    if (result === 'perdu') { 
        return { end: end.endgame, prix: [], message: '' }
    }
    else {
        if(end.quantity >= limit) {
            end.endgame = true
            await end.save()
            return { end: end.endgame, prix: [], message: '' }
        }
        if (result === 'double paires') {
            const prices = await updateBakeryQuantity(1, winner)
            end.quantity+=1
            await end.save()
            return { end: end.endgame, prix: prices, message: 'Voici votre prix' }
        }
        else if (rest >= 2 && result === 'carré'){
            const prices = await updateBakeryQuantity(2, winner)
            end.quantity+=2
            await end.save()
            return { end: end.endgame, prix: prices, message: 'Voici vos prix' }
        }
        else if (rest >= 3 && result === 'yams') {
            const prices = await updateBakeryQuantity(3, winner)
            end.quantity+=3
            await end.save()
            return { end: end.endgame, prix: prices, message: 'Voici vos prix' }
        } 
        else {
            const prices = await updateBakeryQuantity(rest, winner)
            end.quantity+=rest
            await end.save()
            return { end: end.endgame, prix: prices, message: "Il ne restait malheureusement plus assez de prix, voici ce qu'il restait. Entrez ce code pour bénéficier en plus d'une réduction en boutique: MOINS20POURCENT" }
        }
    }
}