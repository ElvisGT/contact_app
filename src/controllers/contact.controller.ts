import { Request,Response } from 'express'
import { User } from '../entities';
import {Contact} from '../entities/Contact'
import { contact } from '../types/contact';


const getContacts = async (req:Request,res:Response) => {
    const id = 1
    const user = await User.findOneBy({id,active:true}) || {}
    const contacts = await Contact.find({
        relations:['user'],
        where:{
            active:true,
            user
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
    const id = 2
    const user = await User.findOneBy({id,active:true})


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