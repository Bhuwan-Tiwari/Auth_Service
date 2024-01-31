const validateUserAuth =(req,res,next)=>
{
    if(!req.body.email || !req.body.password)
    {
        return res.status(400).json({
            success : false,
            data:{},
            message : 'something went wrong',
            err :'Email or password missing in the singup request'
        })
    }

    next();
}
   const validateIsAdminRequest =(req,res,next)=>{
    if(!req.body.id)
    {
        return res.status(400).json({
            success:false,
            data :{},
            err:'User id not given',
            message : 'Something went wrong'

        })
    }
   }

module.exports ={
    validateUserAuth,
    validateIsAdminRequest
}