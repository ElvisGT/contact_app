import {Response,Request,NextFunction} from 'express'
import { myCache } from '../app'

export const clearCache = (req:Request,res:Response,next:NextFunction) => {
    if(myCache.has("result")){
        myCache.del("result")
    }

    if(myCache.has("results")){
        myCache.del("results")
    }
    next()
}