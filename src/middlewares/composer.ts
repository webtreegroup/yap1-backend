import bodyParser = require('body-parser')
import cookieParser = require('cookie-parser')
import cors = require('cors')
import { Express } from 'express'
import { SECRET_KEY } from '../consts'

export function composeMiddlewares(server: Express) {
    server.use(cors({ origin: 'http://localhost:8000', credentials: true }))
    server.use(cookieParser(SECRET_KEY))
    server.use(bodyParser.json())
}
