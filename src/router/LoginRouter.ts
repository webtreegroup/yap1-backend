import { Express } from 'express'
import { LoginController } from '../controllers/LoginController'
import { auth } from '../middlewares/auth'

export class LoginRouter {
    private _server: Express

    constructor(server: Express) {
        this._server = server

        this.init()
    }

    private init() {
        this._server.post(`/signin`, LoginController.signIn)

        this._server.post('/signup', LoginController.signUp)

        this._server.get('/logout', auth, LoginController.logout)
    }
}
