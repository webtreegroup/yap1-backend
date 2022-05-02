import { Express } from 'express'
import { UserRouter } from './UserRouter'

export function composeRoutes(server: Express) {
    new UserRouter(server)
}
