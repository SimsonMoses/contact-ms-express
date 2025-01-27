import expressAsyncHandler from "express-async-handler";
import { Contact } from "../model/contact.js";

export const createContant = async (req, res) => {
    console.log(req.body);
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
        res.status(400)
        throw new Error('Request body is empty');
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })  
    res.status(201).json({ 'message': `created contact`, data:{id:contact.id}});
}

export const getAllContant = async (req, res) => {
    const {id} = req.user;
    let contacts = await Contact.find({user_id:id});
    res.status(200).json({ 'message': "get all contacts",data:contacts });
}

export const updatedContant = async (req, res) => {
    const id = req.params.id;
    let contact = await Contact.findById(id)
    if(!contact) {
        res.status(404)
        throw new Error('Contact Id not found')
    }
    if(contact.user_id != req.user.id){
        res.status(403)
        throw new Error('You are not authorized to update this contact')
    }
    const udpatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body
    )
    res.status(200).json({ 'message': `Updated contant`,data:req.params.id })
}

export const deleteContant = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    let contact = await Contact.findById(id)
    if(!contact) {
        res.status(404)
        throw new Error('Contact Id not found')
    }
    if(contact.user_id != req.user.id){
        res.status(403)
        throw new Error('You are not authorized to update this contact')
    }
    let deletedContact = await Contact.findByIdAndDelete(contact.id)
    console.log(deleteContant);
    
    res.status(200).json({ 'message': `Delete contant: ${deletedContact.id}` })
})

export const getContantById = expressAsyncHandler( async (req, res) => {
    const id = req.params.id;
    let contact = await Contact.findById(id)
    if(!contact) {
        res.status(404)
        throw new Error('Contact Id not found')
    }
    res.status(200).json({ 'message': `Retrived contant: ${req.params.id}`,data:contact });
})