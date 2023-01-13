import { Router } from 'express'
import { verifyJWT } from '../middlewares/verify-JWT';
import { validationAll } from '../middlewares/validation-all';
import { contact } from '../types/contact';
import {
	getContacts,
	createContact,
	updateContact,
	getContactByID,
	deleteContact
} from '../controllers/contact.controller'

const router = Router()

router.get('/',
	[verifyJWT,
		validationAll
	],
	getContacts)

router.get('/:id',
	[verifyJWT,
		validationAll
	], getContactByID)

router.post('/',
	[verifyJWT,
		validationAll
	], createContact)

router.put('/:id',
	[verifyJWT,
		validationAll
	], updateContact)

router.delete('/:id',
	[verifyJWT,
		validationAll
	], deleteContact)


export default router