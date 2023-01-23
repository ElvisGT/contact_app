import { Router } from 'express'
import { verifyJWT } from '../middlewares/verify-JWT';
import { validationAll } from '../middlewares/validation-all';
import {
	getContacts,
	createContact,
	updateContact,
	getContactByID,
	deleteContact
} from '../controllers/contact.controller'
import { getCacheAll, getCacheOne } from '../middlewares/get-cache';
import { clearCache } from '../middlewares/clear-cache';

const router = Router()

router.get('/',

	[	
		verifyJWT,
		getCacheAll,
		validationAll
	],
	getContacts)

router.get('/:id',
	[	
		verifyJWT,
		getCacheOne,
		validationAll
	], getContactByID)

router.post('/',
	[
		verifyJWT,
		clearCache,
		validationAll
	], createContact)

router.put('/:id',
	[
		verifyJWT,
		clearCache,
		validationAll
	], updateContact)

router.delete('/:id',
	[	
		verifyJWT,
		clearCache,
		validationAll
	], deleteContact)


export default router