import { Express } from 'express'
import { UserController } from './UserController'
import { users } from '../../db'
import { auth } from '../../middlewares/auth'

export class UserRouter {
    private _route = users.key
    private _server: Express

    constructor(server: Express) {
        this._server = server

        this.init()
    }

    private init() {
        this._server.get(
            `/${this._route}/current`,
            auth,
            UserController.getCurrentUser,
        )

        this._server.get(
            `/${this._route}/by-login/:login`,
            auth,
            UserController.getByLogin,
        )

        this._server.get(
            `/${this._route}/by-id/:id`,
            auth,
            UserController.getById,
        )

        this._server.delete(
            `/${this._route}/:id`,
            auth,
            UserController.deleteById,
        )

        this._server.get(
            `/${this._route}/:id/chats`,
            auth,
            UserController.getUserChats,
        )

        this._server.put(`/${this._route}/:id`, auth, UserController.updateById)

        this._server.get(`/${this._route}`, auth, UserController.getAll)

        this._server.post(`/${this._route}`, auth, UserController.create)
    }
}
