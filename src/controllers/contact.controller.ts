import { Request,Response } from 'express'
import {Contact} from '../entities/Contact'
import { contact } from '../types/contact';


const getContacts = async (req:Request,res:Response) => {
    const contacts = await Contact.find({
        where:{
            active:true
        }
    })

    res.json(contacts)
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

    res.status(200).json({
        msg:"Ok",
        contact
    })
}

const createContact = async (req:Request,res:Response) => {
    const {name,phonenumber}:contact = req.body

    const contact = new Contact()
    contact.name = name
    contact.phonenumber = phonenumber
    contact.save()

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

    contact.name = name
    contact.phonenumber = phonenumber
    contact.save()

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