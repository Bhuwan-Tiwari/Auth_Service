const express = require ('express')

const {PORT}= require('./config/serverconfig')

const app = express()

const prepareAndStarrtServer = () =>{
    app.listen(PORT,async ()=>
    {
         console.log(`SERVER STARTED AT PORT ${PORT}`)
    })
}
prepareAndStarrtServer ();   