import app from './app'
import { db } from '../db.config';

const PORT = 8080

async function main(){
  try {
    await db.initialize()
    console.log("Conectado exitosamente a la base de datos")
    app.listen(PORT,() => {
      console.log('App corriendo en el puerto',PORT)
    })  
  } catch (error) {
    console.log(error)
  }
  
}

main()
