import { ObjectId, WithId } from 'mongodb'
import { ChatContract, ChatModel } from '../chat/ChatModel'
import { UserContract, UserModel } from '../user/UserModel'

export interface ChatUserModel {
    chatId: ObjectId
    userId: ObjectId
}

export interface ChatUsersDto extends WithId<ChatModel> {
    chatsUsers: WithId<ChatUserModel>[]
    users: WithId<UserModel>[]
}

export interface ChatUsersContract {
    name: string
    ownerId: string
    users: UserContract[]
}

export interface UserChatsDto extends WithId<UserModel> {
    userChats: WithId<ChatUserModel>[]
    chats: WithId<ChatModel>[]
}

export interface UserChatsContract extends WithId<UserModel> {
    chats: ChatContract[]
}
