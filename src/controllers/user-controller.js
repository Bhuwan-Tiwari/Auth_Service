
const UserService = require('../services/user-service')

//create user with email and passworg
const userService = new UserService();
const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        })
    } catch (error) {
        //console.log(error)
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        })
    }    
}

// generate  token  for the user who is email provide with given password check
const signIn = async (req, res) => {
    try {

        const response = await userService.signIn(req.body.email, req.body.password)
        return res.status(201).json({
            success: true,
            message: 'Successfully signIN',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong',
            data: {},
            success: false,
            err: error
        })

    }
}

//it just check user is authenticate and give user id as response
const isAuthenticated = async(req,res)=>
{
   try {
    const token = req.headers['x-access-token']
    const response = await userService.isAuthenticated(token)
    console.log("data in controller",response)
    return res.status(200).json({
        success: true,
        message: 'user is auuthenticates and token is valid',
        data: response,
        err: {}
    })
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        message: 'something went wrong',
        data: {},
        success: false,
        err: error
   })
     }
    }  
    //give boolean value is the given user id is of admin or not
 const isAdmin = async(req,res)=>
 {
    try {
        const response = await  userService.isAdmin(req.body.id)
        return res.status(200).json({
            success: true,
            message: 'Successful fetched whether user is admin or not',
            data: response,
            err: {}
        })
        
    } catch (error) {
        return res.status(500).json({
            message: 'Successful fetched whether user is admin or not',
            data: {},
            success: false, 
            err: error
        })
    }
 }
module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}