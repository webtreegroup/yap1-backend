import { Express } from 'express'
import { LoginRouter } from './LoginRouter'
import { TestRouter } from './TestRouter'
import { UserRouter } from './UserRouter'
import { СhatRouter } from './СhatRouter'

export function composeRoutes(server: Express) {
    new UserRouter(server)
    new LoginRouter(server)
    new TestRouter(server)
    new СhatRouter(server)
}
