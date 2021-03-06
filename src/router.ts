import { Express } from 'express'
import { AuthRouter } from './features/auth/AuthRouter'
import { TestRouter } from './features/test/TestRouter'
import { UserRouter } from './features/user/UserRouter'
import { –°hatRouter } from './features/chat/–°hatRouter'

export function composeRoutes(server: Express) {
    new UserRouter(server)
    new AuthRouter(server)
    new TestRouter(server)
    new –°hatRouter(server)
}
