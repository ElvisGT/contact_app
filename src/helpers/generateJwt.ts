import {sign} from 'jsonwebtoken'
import { secretKey } from '../../config'

export const generateJWT = (id:number) => {
	const payload = {id}

	 return new Promise((resolve,reject) => {

		const token = sign(payload,String(secretKey))

		if(!token){
			reject("Ha ocurrido un error para generar el token")
		}

		resolve(token)
	 })
}