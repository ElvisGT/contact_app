import {Request,Response} from 'express'
import {User} from '../entities/index'
import { user } from '../types/user';

const getUsers = (req:Request,res:Response) => {
  console.log(req.body)
  res.json({
    msg:"Todos"
  })
}
const getUser = (req:Request,res:Response) => {

}
const createUser = (req:Request,res:Response) => {
  // const {name,password}:user = req.body


  console.log(req.body)

  // const user = new User()
  // user.name = name
  // user.password = password

  // res.status(201).json({
  //   msg:'OK',
  //   user
  // })

}
const updateUser = (req:Request,res:Response) => {

}
const deleteUser = (req:Request,res:Response) => {

}

export {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
}