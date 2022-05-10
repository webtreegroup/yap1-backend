import { ObjectId } from 'mongodb'

export interface UserModel {
    login: string
    password: string
    firstName?: string
    secondName?: string
    email?: string
    phone?: string
}

export interface UserContract extends Omit<UserModel, 'password'> {
    id: ObjectId
    login: string
    firstName?: string
    secondName?: string
    email?: string
    phone?: string
}

export interface UserChatModel {
    userId: string
    chatId: string
}
