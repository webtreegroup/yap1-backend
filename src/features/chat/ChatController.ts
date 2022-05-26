import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { ERROR_MESSAGES } from '../../server.config'
import { ReqWithTokenPayload } from '../../middlewares/auth'
import { ChatsUsersMapper } from '../chatUser/ChatUserMapper'
import { ChatUserService } from '../chatUser/ChatUserService'
import { ChatMapper } from './ChatMapper'
import { ChatService } from './ChatService'

export class ChatController {
    static async getAll(_: Request, res: Response) {
        const chats = await ChatService.getAll()

        if (!chats) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json(ChatMapper.mapChats(chats))
        }
    }

    static async getByChatName(req: Request, res: Response) {
        const chat = await ChatService.getByChatName(req.params.name)

        if (!chat) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json(ChatMapper.mapChat(chat))
        }
    }

    static async getById(req: Request, res: Response) {
        const chat = await ChatService.getById(req.params.id)

        if (!chat) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json(ChatMapper.mapChat(chat))
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

    static async getChatUsers(req: Request, res: Response) {
        const chatUsers = await ChatUserService.getChatUsers(req.params.id)

        if (!chatUsers) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json(ChatsUsersMapper.mapUsers(chatUsers))
        }
    }

    static async createChat(req: ReqWithTokenPayload, res: Response) {
        const chat = await ChatService.getByChatName(req.body.name)

        if (chat) {
            res.status(400).json({ message: ERROR_MESSAGES[400] })

            return
        }

        const result = await ChatService.createChat({
            name: req.body.name,
            ownerId: req.userId,
        })

        if (!result) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })

            return
        }

        const addRelResult = await ChatUserService.addRelations({
            userId: new ObjectId(req.userId),
            chatId: result.insertedId,
        })

        if (!addRelResult) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })

            return
        }

        res.status(200).json({
            message: 'Entity created!',
            result,
        })
    }
}
