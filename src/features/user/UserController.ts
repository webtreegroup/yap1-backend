import { Request, Response } from 'express'
import { ReqWithTokenPayload } from '../../middlewares/auth'
import { UserMapper } from './UserMapper'
import { UserService } from './UserService'
import { ChatUserService } from '../chatUser/ChatUserService'
import { ChatsUsersMapper } from '../chatUser/ChatUserMapper'
import { MESSAGES } from '../../core/validation'

export class UserController {
    static async getAll(_: Request, res: Response) {
        const users = await UserService.getAll()

        if (!users) {
            res.status(200).send([])
        } else {
            res.status(200).send(UserMapper.mapUsers(users))
        }
    }

    static async getCurrentUser(req: ReqWithTokenPayload, res: Response) {
        const user = await UserService.getById(req.userId)

        if (!user) {
            res.statusMessage = MESSAGES.USER_DOES_NOT_EXIST

            res.status(404).send()
        } else {
            res.status(200).send(UserMapper.mapUser(user))
        }
    }

    static async getByLogin(req: Request, res: Response) {
        const user = await UserService.getByLogin(req.params.login)

        if (!user) {
            res.statusMessage = 'Пользователь не найден'

            res.status(404).send()
        } else {
            res.statusMessage = 'Пользователь успешно добавлен'

            res.status(200).send(UserMapper.mapUser(user))
        }
    }

    static async getById(req: Request, res: Response) {
        const user = await UserService.getById(req.params.id)

        if (!user) {
            res.statusMessage = MESSAGES.USER_DOES_NOT_EXIST

            res.status(404).send()
        } else {
            res.status(200).send(UserMapper.mapUser(user))
        }
    }

    static async deleteById(req: Request, res: Response) {
        const result = await UserService.deleteById(req.params.id)

        if (!result) {
            res.statusMessage = MESSAGES.SERVER_ERROR

            res.status(500).send()
        } else {
            res.statusMessage = MESSAGES.USER_DELETED_SUCCESSFULLY

            res.status(200).send()
        }
    }

    static async updateById(req: Request, res: Response) {
        const result = await UserService.updateById(req.params.id, req.body)

        if (!result) {
            res.statusMessage = MESSAGES.SERVER_ERROR

            res.status(500).send()
        } else {
            res.statusMessage = MESSAGES.USER_UPDATED_SUCCESSFULLY

            res.status(200).send()
        }
    }

    static async create(req: Request, res: Response) {
        const result = await UserService.create(req.body)

        if (!result) {
            res.statusMessage = MESSAGES.SERVER_ERROR

            res.status(500).send()
        } else {
            res.statusMessage = MESSAGES.USER_ADDED_SUCCESSFULLY

            res.status(200).send()
        }
    }

    static async getUserChats(req: Request, res: Response) {
        const userChats = await ChatUserService.getUserChats(req.params.id)

        if (!userChats) {
            res.status(200).send([])
        } else {
            res.status(200).send(ChatsUsersMapper.mapChats(userChats))
        }
    }
}
