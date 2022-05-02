import bodyParser = require('body-parser')
import { Express } from 'express'

export function composeMiddlewares(server: Express) {
    server.use(bodyParser.urlencoded({ extended: true }))
}
