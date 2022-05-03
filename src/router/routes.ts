import { Express } from 'express'
import { LoginRouter } from './LoginRouter'
import { UserRouter } from './UserRouter'

export function composeRoutes(server: Express) {
    new UserRouter(server)
    new LoginRouter(server)
}
