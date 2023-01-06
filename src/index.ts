import app from './app'
import { db } from '../db.config';
import { PORT } from '../config';

const port = PORT

async function main(){
  try {
    await db.initialize()
    console.log("Conectado exitosamente a la base de datos")
    app.listen(port,() => {
      console.log('App corriendo en el puerto',port)
    })  
  } catch (error) {
    console.log(error)
  }
  
}

main()
