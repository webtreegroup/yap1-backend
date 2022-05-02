import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    static async getAll(_: Request, res: Response) {
        const users = await UserService.getAll()

        if (!users) {
            res.send({ error: 'An error has occurred' })
        } else {
            res.send(users)
        }
    }

    static async getById(req: Request, res: Response) {
        const user = await UserService.getById(req.params.id)

        if (!user) {
            res.send({ error: 'An error has occurred' })
        } else {
            res.send(user)
        }
    }

    static async deleteById(req: Request, res: Response) {
        const result = await UserService.deleteById(req.params.id)

        if (!result) {
            res.send({ error: 'An error has occurred' })
        } else {
            res.send('Note ' + req.params.id + ' deleted!')
        }
    }

    static async updateById(req: Request, res: Response) {
        const result = await UserService.updateById(req.params.id, req.body)

        if (!result) {
            res.send({ error: 'An error has occurred' })
        } else {
            res.send(result)
        }
    }

    static async create(req: Request, res: Response) {
        const result = await UserService.create(req.body)

        if (!result) {
            res.send({ error: 'An error has occurred' })
        } else {
            res.send(result)
        }
    }
}
