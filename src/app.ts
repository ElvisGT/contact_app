import express, { Request, Response } from "express"
import cors from 'cors'
import userRoutes from './routes/users.routes'
import contactRoutes from './routes/contact.routes'

const app: express.Application = express()

//paths
const paths = {
  users:'/api/v1/users',
  contacts:'/api/v1/contacts'
}

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.use(paths.users,userRoutes)
app.use(paths.contacts,contactRoutes)
app.use('*',(req:Request,res:Response) => {
  res.status(404).json({
    msg:"Ruta no encontrada"
  })
})

export default app