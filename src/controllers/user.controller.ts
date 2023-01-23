import { Request, Response } from 'express'
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import { User } from '../entities/index'
import { user } from '../types/user';
import { generateJWT } from '../helpers/generateJwt'

import {myCache} from '../app'

export const closeSession = (req:Request,res:Response) => {
  res.status(200).json({
    msg:"Logout"
  })
}

const getUsers = async (req: Request, res: Response) => {
    const total = await User.countBy({ active: true })
    const users = await User.find({
      where: {
        active: true
      }
    })
    const result = {
      total,
      users
    }
    myCache.set("results",result)
    res.status(200).json(result)
}
const getUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  const user = await User.findOneBy({ id })

  res.status(200).json({
    user
  })

}
const createUser = async (req: Request, res: Response) => {
  const { name, password }: user = req.body

  const salt = genSaltSync()
  const hashedPassword = hashSync(password, salt)

  let user = await User.findOneBy({ name })

  if (!user) {
    user = new User()
    user.name = name
    user.password = hashedPassword

    await user.save()
  }

  const passwordExists = compareSync(password, user.password)

  if (!passwordExists) {
    return res.status(401).json({
      msg: "Password incorrecta"
    })
  }

  //Generar JWT
  const token = await generateJWT(user.id)
    .then(data => data)
    .catch(err => res.status(400).json(err))

  res.status(201).json({
    msg: 'OK',
    token,
    user
  })

}
const updateUser = async (req: Request, res: Response) => {
  const { name, password }: user = req.body
  const id = parseInt(req.params.id)

  const user = await User.findOneBy({ id, active: true })

  if (!user) {
    return res.status(400).json({
      msg: "Usuario no existente"
    })
  }

  user.name = name
  user.password = password
  user.save()

  res.status(200).json({
    user
  })
}
const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  const user = await User.findOneBy({ id })

  if (user) {
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