import { Request,Response,NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secretKey } from '../../config';
import { payload } from '../types/user';
import {User} from '../entities'

export const verifyJWT = async(req:Request,res:Response,next:NextFunction) => {
  const token = req.header("x-token") as string

  try{

    if(!token){
      return res.status(400).json({
        msg:"No hay token en la peticion"
      })
    }

    const {id}:payload = verify(token,String(secretKey)) as payload

    const user = await User.findOneBy({id})
    //@ts-ignore
    req.logUser = user

    next()

  }catch(err){
    return res.status(400).json({
      msg:"Token no valido"
    })
  }
}