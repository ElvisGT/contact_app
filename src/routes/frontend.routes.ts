import { Router } from 'express';


const router = Router()

router.get('/contacts',(req,res) => {
  res.render("contacts")
})

export default router