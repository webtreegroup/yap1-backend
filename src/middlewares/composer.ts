import bodyParser = require('body-parser')
import cookieParser = require('cookie-parser')
import cors = require('cors')
import { Express } from 'express'
import { AUTH_TOKEN_SECRET_KEY } from '../server.config'
import { CLIENT_PORT } from '../server.config'

export function composeMiddlewares(server: Express) {
    server.use(
        cors({ origin: `http://localhost:${CLIENT_PORT}`, credentials: true }),
    )
    server.use(cookieParser(AUTH_TOKEN_SECRET_KEY))
    server.use(bodyParser.json())
}
