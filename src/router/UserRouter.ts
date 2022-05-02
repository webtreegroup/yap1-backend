import { Express } from 'express'
import { UserController } from '../controllers/UserController'
import { users } from '../db'

export class UserRouter {
    private _route = users.key
    private _server: Express

    constructor(server: Express) {
        this._server = server

        this.init()
    }

    private init() {
        this._server.get(`/${this._route}/:id`, UserController.getById)

        this._server.delete(`/${this._route}/:id`, UserController.deleteById)

        this._server.put(`/${this._route}/:id`, UserController.updateById)

        this._server.get(`/${this._route}`, UserController.getAll)

        this._server.post(`/${this._route}`, UserController.create)
    }
}
