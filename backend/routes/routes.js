import express from 'express'
import { createBakery } from '../controllers/BakeryController.js'
import { rollTheDice, resetGame } from '../controllers/GameController.js'
import { createUser, login, checkLogged } from '../controllers/UserController.js'
import { getPrices } from '../controllers/PriceController.js'
const router = express.Router()

router.post('/users', createUser)
router.post('/login', login)
router.get('/game', checkLogged, rollTheDice)
router.get('/prices', getPrices)

// Utilisé juste pour faciliter les tests avec postman
router.post('/bakeries', createBakery)
router.get('/newgame', resetGame)

export default router