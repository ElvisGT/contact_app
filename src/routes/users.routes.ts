import { Router } from "express"
import {check} from 'express-validator'
import { validateUserName } from '../../middlewares/validation-user';
import {validationAll} from '../../middlewares/validation-all'
import { createUser, 
        deleteUser, 
        getUser, 
        getUsers, 
        updateUser } from "../controllers/user.controller"

const router = Router()

router.get('/',getUsers)
router.get('/:id',getUser)
router.post('/',[
        check('name').custom(validateUserName),
        validationAll
],createUser)
router.put('/:id',[
        check('name').custom(validateUserName),
        validationAll
],updateUser)
router.delete('/:id',deleteUser)

export default router