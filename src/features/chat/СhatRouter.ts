import { Express } from 'express'
import { ChatController } from './ChatController'
import { chats } from '../../db'
import { auth } from '../../middlewares/auth'

export class СhatRouter {
    private _route = chats.key
    private _server: Express

    constructor(server: Express) {
        this._server = server

        this.init()
    }

    private init() {
        this._server.get(`/${this._route}/:id`, auth, ChatController.getById)

        this._server.get(
            `/${this._route}/:chatName`,
            auth,
            ChatController.getByChatName,
        )

        this._server.delete(
            `/${this._route}/:id`,
            auth,
            ChatController.deleteById,
        )

        this._server.put(`/${this._route}/:id`, auth, ChatController.updateById)

        this._server.get(
            `/${this._route}/:id/users`,
            auth,
            ChatController.getChatUsers,
        )

        this._server.get(`/${this._route}`, auth, ChatController.getAll)

        this._server.post(`/${this._route}`, auth, ChatController.create)
    }
}
