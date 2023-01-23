import { Request, Response, NextFunction } from 'express'
import {myCache} from '../app'


export const getCacheAll = (req:Request, res: Response, next: NextFunction) => {

    if(myCache.has('results')){
        return res.status(200).json(myCache.get('results'))
    }

    next()
}

export const getCacheOne = (req:Request, res: Response, next: NextFunction) => {

    if(myCache.has('result')){
        return res.status(200).json(myCache.get('result'))
    }

    next()
}