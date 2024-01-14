const express = require('express')
const bodyParser = require('body-parser')

const { PORT } = require('./config/serverconfig')
const apiRoutes = require('./routes/index')
const UserRepository = require('./repository/user-repository')
const app = express()

const prepareAndStarrtServer = () => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/api', apiRoutes)


    app.listen(PORT, async () => {
        console.log(`SERVER STARTED AT PORT ${PORT}`)
        // const repo = new UserRepository();
        // const response = await repo.getById(1)
        // console.log(response) 
    })
}
prepareAndStarrtServer();   