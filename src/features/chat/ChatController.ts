import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { ReqWithTokenPayload } from '../../middlewares/auth'
import { ChatsUsersMapper } from '../chatUser/ChatUserMapper'
import { ChatUserService } from '../chatUser/ChatUserService'
import { ChatMapper } from './ChatMapper'
import { ChatService } from './ChatService'
import {
    getValidationMessage,
    validateRequiredFields,
    MESSAGES,
} from '../../core/validation'

export class ChatController {
    static async getAll(_: Request, res: Response) {
        const chats = await ChatService.getAll()

        if (!chats) {
            res.status(200).send([])
        } else {
            res.status(200).send(ChatMapper.mapChats(chats))
        }
    }

    static async getByChatName(req: Request, res: Response) {
        const chat = await ChatService.getByChatName(req.params.name)

        if (!chat) {
            res.statusMessage = MESSAGES.CHAT_DOES_NOT_EXIST

            res.status(404)
        } else {
            res.status(200).send(ChatMapper.mapChat(chat))
        }
    }

    static async getById(req: Request, res: Response) {
        const chat = await ChatService.getById(req.params.id)

        if (!chat) {
            res.statusMessage = MESSAGES.CHAT_DOES_NOT_EXIST

            res.status(404)
        } else {
            res.status(200).send(ChatMapper.mapChat(chat))
        }
    }

    static async deleteById(req: Request, res: Response) {
        const result = await ChatService.deleteById(req.params.id)

        if (!result) {
            res.statusMessage = MESSAGES.SERVER_ERROR

            res.status(404)
        } else {
            res.statusMessage = MESSAGES.CHAT_DELETED_SUCCESSFULLY

            res.status(200)
        }
    }

    static async deleteByName(req: ReqWithTokenPayload, res: Response) {
        const validateResult = validateRequiredFields(req.body, ['name'])

        if (!validateResult.state) {
            res.statusMessage = getValidationMessage(validateResult.fields)

            return res.status(400)
        }

        const chatDto = await ChatService.getByChatName(req.body.name)

        const deleteResult = await ChatService.deleteById(
            chatDto._id.toString(),
        )

        if (!deleteResult) {
            res.statusMessage = MESSAGES.SERVER_ERROR

            return res.status(500)
        }

        const deleteRelResult = await ChatUserService.deleteChatRelations(
            chatDto._id.toString(),
        )

        if (!deleteRelResult) {
            res.statusMessage = MESSAGES.SERVER_ERROR

            return res.status(500)
        }

        res.statusMessage = MESSAGES.CHAT_DELETED_SUCCESSFULLY

        res.status(200)
    }

    static async updateById(req: Request, res: Response) {
        const result = await ChatService.updateById(req.params.id, req.body)

        if (!result) {
            res.statusMessage = MESSAGES.SERVER_ERROR

            res.status(500)
        } else {
            res.statusMessage = MESSAGES.CHAT_UPDATED_SUCCESSFULLY

            res.status(200)
        }
    }

    static async getChatUsers(req: Request, res: Response) {
        const chatUsers = await ChatUserService.getChatUsers(req.params.id)

        if (!chatUsers) {
            res.status(200).send([])
        } else {
            res.status(200).send(ChatsUsersMapper.mapUsers(chatUsers))
        }
    }

    static async createChat(req: ReqWithTokenPayload, res: Response) {
        const validateResult = validateRequiredFields(req.body, ['name'])

        if (!validateResult.state) {
            res.statusMessage = getValidationMessage(validateResult.fields)

            return res.status(400)
        }

        const chat = await ChatService.getByChatName(req.body.name)

        if (chat) {
            res.statusMessage = MESSAGES.ALREADY_EXIST

            return res.status(400)
        }

        const result = await ChatService.createChat({
            name: req.body.name,
            ownerId: req.userId,
        })

        if (!result) {
            res.statusMessage = MESSAGES.SERVER_ERROR

            return res.status(500)
        }

        const addRelResult = await ChatUserService.addRelations({
            userId: new ObjectId(req.userId),
            chatId: result.insertedId,
        })

        if (!addRelResult) {
            res.statusMessage = MESSAGES.SERVER_ERROR

            return res.status(500)
        }

        res.statusMessage = MESSAGES.CHAT_ADDED_SUCCESSFULLY

        res.status(200)
    }
}
