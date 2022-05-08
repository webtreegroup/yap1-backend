import express = require('express')
import { composeRoutes } from './router'
import { composeMiddlewares } from './middlewares/composer'
import { DataBase } from './db'

const port = 5000
const server = express()

composeMiddlewares(server)
composeRoutes(server)

async function startApp() {
    await DataBase.connect()

    console.log('Databse Connected successfully to server!')
}

startApp()
    .then(() => {
        server.listen(port, () => {
            console.log('Server port is: ' + port!)
        })
    })
    .catch(console.error)
