import {Request,Response} from 'express'
import {User} from '../entities/index'
import { user } from '../types/user';

const getUsers = async(req:Request,res:Response) => {
  const total = await User.countBy({active:true})
  const users = await User.find({
    where:{
      active:true
    }
  })

  res.json({
    msg:"ok",
    total,
    users
  })
}
const getUser = async(req:Request,res:Response) => {
  const id = parseInt(req.params.id)

  const user = await User.findOneBy({id})

  res.status(200).json({
    user
  })

}
const createUser = async(req:Request,res:Response) => {
  const {name,password}:user = req.body


  const user = new User()
  user.name = name
  user.password = password

  await user.save()

  res.status(201).json({
    msg:'OK',
    user
  })

}
const updateUser = async(req:Request,res:Response) => {
  const {name,password}:user = req.body
  const id = parseInt(req.params.id)

  const user = await User.findOneBy({id,active:true})
  
  if(user){
    user.name = name
    user.password = password
    user.save()
  }


  res.status(200).json({
    user
  })
}
const deleteUser = async(req:Request,res:Response) => {
  const id = parseInt(req.params.id)

  const user = await User.findOneBy({})

  if(user){
    user.active = false
    user.save()
  }

  res.status(200).json({
    user
  })
}

export {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
}