import { Router } from "express"
import {check} from 'express-validator'
import { validateUserName } from '../middlewares/validation-user';
import {validationAll} from '../middlewares/validation-all'
import { createUser, 
        deleteUser, 
        getUser, 
        getUsers, 
        updateUser } from "../controllers/user.controller"
import { getCache } from "../middlewares/get-cache";

const router = Router()

router.get('/',[
        getCache,
        validationAll
],getUsers)

router.get('/:id',getUser)

router.post('/',createUser)

router.put('/:id',[
        check('name').custom(validateUserName),
        validationAll
],updateUser)

router.delete('/:id',deleteUser)

export default router