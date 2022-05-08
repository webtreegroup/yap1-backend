import { Express } from 'express'
import { AuthController } from './AuthController'
import { auth } from '../../middlewares/auth'

export class AuthRouter {
    private _server: Express

    constructor(server: Express) {
        this._server = server

        this.init()
    }

    private init() {
        this._server.post(`/auth/signin`, AuthController.signIn)

        this._server.post('/auth/signup', AuthController.signUp)

        this._server.get('/auth/logout', auth, AuthController.logout)
    }
}
