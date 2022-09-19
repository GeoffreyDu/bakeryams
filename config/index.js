import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.BACK_PORT
export const hostname = process.env.APP_HOSTNAME
export const db_url = process.env.DB_URL
export const front_origin = process.env.FRONT_ORIGIN