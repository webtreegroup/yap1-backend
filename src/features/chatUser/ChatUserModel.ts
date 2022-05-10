import { ObjectId, WithId } from 'mongodb'
import { ChatModel } from '../chat/ChatModel'
import { UserContract, UserModel } from '../user/UserModel'

export interface ChatUserModel {
    chatId: ObjectId
    userId: ObjectId
}

export interface ChatUserDto extends WithId<ChatModel> {
    chatsUsers: WithId<ChatUserModel>[]
    users: WithId<UserModel>[]
}

export interface ChatUsersContract {
    name: string
    ownerId: string
    users: UserContract[]
}
