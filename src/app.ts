import express, { Request, Response } from "express"
import path from 'path'
import cors from 'cors'
import {userRoutes,
        contactRoutes,
        frontendRoutes} from './routes/index.routes'


const app: express.Application = express()

//paths
const paths = {
  users:'/api/v1/users',
  contacts:'/api/v1/contacts',
  frontend:'/'
}
const publicPath = path.join(__dirname,"../public")


//middlewares
app.use(express.static(publicPath))
app.use(cors())
app.use(express.json())

//handlebars
app.set("views",'dist/views')
app.set("view engine","hbs")

//routes
app.use(paths.users,userRoutes)
app.use(paths.contacts,contactRoutes)
app.use(paths.frontend,frontendRoutes)
app.use('*',(req:Request,res:Response) => {
  res.status(404).json({
    msg:"Ruta no encontrada"
  })
})

export default app