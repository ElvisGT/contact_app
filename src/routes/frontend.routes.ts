import { Router } from 'express';


const router = Router()

router.get('/contacts',(req,res) => {
  res.render("contacts")
})

router.get('/users',(req,res) => {
  res.render("users")
})


export default router