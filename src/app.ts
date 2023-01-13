import express, { Request, Response } from "express"
import path from 'path'
import 'hbs'
import cors from 'cors'
import {userRoutes,
        contactRoutes,
        homeRoutes} from './routes/index.routes'


const app: express.Application = express()

//paths
const paths = {
  users:'/api/v1/users',
  contacts:'/api/v1/contacts',
  home:'/api/v1/'
}
const publicPath = path.join(__dirname,"../public")


//middlewares
app.use(express.static(publicPath))
app.use(cors())
app.use(express.json())

//statics
// app.set("view engine","hbs")

//routes
app.use(paths.home,homeRoutes)
app.use(paths.users,userRoutes)
app.use(paths.contacts,contactRoutes)
app.use('*',(req:Request,res:Response) => {
  res.status(404).json({
    msg:"Ruta no encontrada"
  })
})

export default app