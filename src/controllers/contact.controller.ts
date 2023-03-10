import { Request,Response } from 'express'
import { myCache } from '../app';
import {Contact} from '../entities/Contact'
import { contact } from '../types/contact';


const getContacts = async (req:Request,res:Response) => {
    //@ts-ignore
    const user = req.logUser
    const total = await Contact.countBy({active:true,user})
    const contacts = await Contact.find({
        relations:['user'],
        where:{
            active:true,
            user
        }
    })
    const result = {
        total,
        contacts
    }
    myCache.set('results',result)
    res.status(200).json(result)
}

const getContactByID = async (req:Request,res:Response) => {
    const id = Number(req.params.id)
    const contact = await Contact.findOne({
        where:{
            id,
            active:true
        }
    })

    if(!contact){
        return res.status(400).json({
            msg:"Contacto no existente"
        })
    }

    myCache.set('result',contact)
    res.status(200).json(contact)
}

const createContact = async (req:Request,res:Response) => {
    const {name,phonenumber}:contact = req.body
    //@ts-ignore
    const user = req.logUser

    const contact = new Contact()
    contact.name = name
    contact.phonenumber = phonenumber
    if(user){
       contact.user = [user]
    }
    
    await contact.save()
    
    res.status(201).json({
        msg:"Ok",
        contact
    })
}

const updateContact = async (req:Request,res:Response) => {
    const id = Number(req.params.id)
    const {name,phonenumber}:contact = req.body

    const contact = await Contact.findOneBy({id})

    if(!contact){
        return res.status(400).json({
            msg:"Contacto no existente"
        })
    }

    contact.name = name ? name : contact.name
    contact.phonenumber = phonenumber ? phonenumber : contact.phonenumber
    await contact.save()

    res.status(200).json({
        msg:"Updated Ok",
        contact
    })
} 

const deleteContact = async (req:Request,res:Response) => {
    const id = Number(req.params.id)
    
    const contact = await Contact.findOne({
        where:{
            id
        }
    })

    if(!contact){
        return res.status(400).json({
            msg:"Contacto no existente"
        })
    }

    contact.active = false
    contact.save()

    res.status(200).json({
        msg:"Deleted Ok",
        contact
    })
}

export {getContacts,
        createContact,
        updateContact,
        getContactByID,
        deleteContact}