//validation error use to show the clietn side error it is error in email and password like some thing

const AppError = require('./error-handler')
const {StatusCodes}= require('http-status-codes')

class ValidationError extends AppError
{
    constructor(error)
    {
        let errorname = error.name;
        let explanation =[];
        error.errors.forEach((err)=>
        {
            explanation.push(err.message)
        })
        super(
            errorName,
            'Not able to validate the data sent in the request',
            explanation,
            StatusCodes.BAD_REQUEST

        )
    }
   
}
module.exports= ValidationError
