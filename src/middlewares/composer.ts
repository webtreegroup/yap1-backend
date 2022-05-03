import bodyParser = require('body-parser')
import cookieParser = require('cookie-parser')
import { Express } from 'express'
import { SECRET_KEY } from '../consts'

export function composeMiddlewares(server: Express) {
    server.use(cookieParser(SECRET_KEY))
    server.use(bodyParser.urlencoded({ extended: true }))
}
