import { Request, Response } from 'express'
import { ERROR_MESSAGES } from '../consts'
import { UserService } from '../services/UserService'

export class UserController {
    static async getAll(_: Request, res: Response) {
        const users = await UserService.getAll()

        if (!users) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json(users)
        }
    }

    static async getByLogin(req: Request, res: Response) {
        const user = await UserService.getById(req.params.id)

        if (!user) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json(user)
        }
    }

    static async getById(req: Request, res: Response) {
        const user = await UserService.getById(req.params.id)

        if (!user) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json(user)
        }
    }

    static async deleteById(req: Request, res: Response) {
        const result = await UserService.deleteById(req.params.id)

        if (!result) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json({
                message: 'Entity with id: ' + req.params.id + ' deleted!',
                result,
            })
        }
    }

    static async updateById(req: Request, res: Response) {
        const result = await UserService.updateById(req.params.id, req.body)

        if (!result) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json({
                message: 'Entity with id: ' + req.params.id + ' updated!',
                result,
            })
        }
    }

    static async create(req: Request, res: Response) {
        const result = await UserService.create(req.body)

        if (!result) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json({
                message: 'Entity created!',
                result,
            })
        }
    }
}
