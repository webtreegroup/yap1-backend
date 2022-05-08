import { Express } from 'express'
import { auth, ReqWithTokenPayload } from '../../middlewares/auth'

export class TestRouter {
    private _server: Express

    constructor(server: Express) {
        this._server = server

        this.init()
    }

    private init() {
        this._server.get(
            '/protected',
            auth,
            (req: ReqWithTokenPayload, res) => {
                return res.json({
                    user: { id: req.userId, role: req.userEmail },
                })
            },
        )
    }
}
