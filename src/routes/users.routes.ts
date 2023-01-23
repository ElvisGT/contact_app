import { Router } from "express"
import {check} from 'express-validator'
import { validateUserName } from '../middlewares/validation-user';
import {validationAll} from '../middlewares/validation-all'
import { closeSession, createUser, 
        deleteUser, 
        getUser, 
        getUsers, 
        updateUser } from "../controllers/user.controller"
import { getCacheAll } from "../middlewares/get-cache";
import { verifyJWT } from "../middlewares/verify-JWT";
import { clearCache } from "../middlewares/clear-cache";

const router = Router()

router.get('/logout',[
        verifyJWT,
        clearCache,
        validationAll
],closeSession)

router.get('/',[
        getCacheAll,
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