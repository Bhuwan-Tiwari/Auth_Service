const express = require('express');

const UserController = require('../../controllers/user-controller')
const {AuthRequestValidator}=require('../../middlewares/index')

const router = express.Router()

router.post('/signup',AuthRequestValidator.validateUserAuth,UserController.create);
router.post('/signin',AuthRequestValidator.validateUserAuth,UserController.signIn);

router.get('/isAuthenticated',AuthRequestValidator.validateIsAdminRequest,UserController.isAuthenticated)

router.get('/isAdmin',UserController.isAdmin)

// router.get('/dummy',(req,res)=>
// {
//     return res.status(200).json({message:'ok'})
// })
module.exports=router