import {config} from 'dotenv'
config()

export const PORT = process.env.PORT || 8080
export const DB_URL = process.env.DB_URL
export const secretKey = process.env.SECRET_KEY