import express = require('express')
import http = require('http')
import { composeRoutes } from './router'
import { composeMiddlewares } from './middlewares/composer'
import { DataBase } from './db'
import { SERVER_PORT } from './server.config'

const app = express()
export const server = http.createServer(app)

composeMiddlewares(app)
composeRoutes(app)

async function startApp() {
    await DataBase.connect()

    console.log('Databse Connected successfully to server!')
}

startApp()
    .then(() => {
        server.listen(SERVER_PORT, () => {
            console.log(`Server port is: ${SERVER_PORT}!`)
        })
    })
    .catch(console.error)
