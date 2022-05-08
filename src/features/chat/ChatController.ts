import { Request, Response } from 'express'
import { ERROR_MESSAGES } from '../../consts'
import { ChatService } from './ChatService'

export class ChatController {
    static async getAll(_: Request, res: Response) {
        const chats = await ChatService.getAll()

        if (!chats) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json(chats)
        }
    }

    static async getByChatName(req: Request, res: Response) {
        const chat = await ChatService.getByChatName(req.params.login)

        if (!chat) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json(chat)
        }
    }

    static async getById(req: Request, res: Response) {
        const chat = await ChatService.getById(req.params.id)

        if (!chat) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json(chat)
        }
    }

    static async deleteById(req: Request, res: Response) {
        const result = await ChatService.deleteById(req.params.id)

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
        const result = await ChatService.updateById(req.params.id, req.body)

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
        const result = await ChatService.create(req.body)

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
