import express from 'express'
import { createBakery } from '../controllers/BakeryController.js'
import { rollTheDice, resetGame } from '../controllers/GameController.js';

const router = express.Router()

router.post('/bakeries', createBakery)
router.get('/game', rollTheDice)
router.get('/newgame', resetGame)

export default router