import { MongoClient } from 'mongodb'
import express = require('express')
import { composeRoutes } from './router/routes'
import { composeMiddlewares } from './middlewares/composer'

const port = 8000
const url = 'mongodb://root:example@localhost:27017'
const dbName = 'nodejsauth'
const dbClient = new MongoClient(url)
const db = dbClient.db(dbName)

const server = express()

composeMiddlewares(server)
composeRoutes(server, db)

async function startApp() {
    await dbClient.connect()

    console.log('Databse Connected successfully to server')
}

startApp()
    .then(() => {
        server.listen(port, () => {
            console.log('Server port is: ' + port)
        })
    })
    .catch(console.error)
