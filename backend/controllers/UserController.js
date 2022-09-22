import jwt from 'jsonwebtoken'
import { UserModel } from "../models/User.js"
import { passwordEncrypter, comparePassword } from "../helpers/helper.js"
import { secret } from '../config/index.js'

// User creation
export const createUser = async (req, res) => {
    const user = req.body
    if (user.password === user.confirmPassword) {
        delete user.confirmPassword
        try {
            // Encrypt the password before storing in database
            const passwordEncrypted = await passwordEncrypter(user.password)
            user.password = passwordEncrypted
            await UserModel.create(user)
            res.json ({ message: 'user created' })
        } catch (error) {
            res.json({ error: error.message })
        }    
    }
    else {
        res.status(401).json({ error: "Le mot de passe et la confirmation ne correspondent pas" })
    }
}

// Connection to user's account
export const login = async (req, res) => {
    try {
        const reqUser = req.body
        const bddUser = await UserModel.findOne({ mail: reqUser.mail })
        if (!bddUser) {
            return res.status(401).json({error: `Le mail ${reqUser.mail} n'existe pas dans notre base de données`})
        }

        const userExists = await comparePassword(reqUser.password, bddUser.password)
        if (userExists) {
            // token to send to the frontend
            const token = jwt.sign(
                { 
                    userId: bddUser._id,
                    username: bddUser.username
                },
                secret,
                { expiresIn: '1h' }
            )
            res.json({ token })     
        } 
        else {
            res.status(401).json({ error: "Mot de passe incorrect"})
        }
    } catch (error) {
        res.json({ error: error.message })
    }
}

// Middleware to access to private operations
export const checkLogged = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, secret)
        const userId = decodedToken.userId
        req.auth = {
            userId: userId
        }
        next()
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}