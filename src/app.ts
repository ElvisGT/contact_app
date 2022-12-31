import express from "express"
import cors from 'cors'
import userRoutes from './routes/users.routes'

const app: express.Application = express()

//paths
const paths = {
  users:'/api/v1/users'
}

//middlewares
app.use(cors())

//routes
app.use(paths.users,userRoutes)

export default app