import bodyParser = require('body-parser')
import { Express } from 'express'
import { auth } from './auth'

export function composeMiddlewares(server: Express) {
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(auth)
}
