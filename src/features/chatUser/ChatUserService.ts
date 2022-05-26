import { ObjectId } from 'mongodb'
import { chats, chatsUsers, users } from '../../db'
import { ChatUsersDto, ChatUserModel, UserChatsDto } from './ChatUserModel'

export class ChatUserService {
    static async getChatUsers(chatId: string) {
        return chats.collection
            .aggregate<ChatUsersDto>([
                {
                    $match: {
                        _id: new ObjectId(chatId),
                    },
                },
                {
                    $lookup: {
                        from: 'chatsUsers',
                        localField: '_id',
                        foreignField: 'chatId',
                        as: 'chatUsers',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'chatUsers.userId',
                        foreignField: '_id',
                        as: 'users',
                    },
                },
            ])
            .toArray()
    }

    static async getUserChats(userId: string) {
        return users.collection
            .aggregate<UserChatsDto>([
                {
                    $match: {
                        _id: new ObjectId(userId),
                    },
                },
                {
                    $lookup: {
                        from: 'chatsUsers',
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'userChats',
                    },
                },
                {
                    $lookup: {
                        from: 'chats',
                        localField: 'userChats.chatId',
                        foreignField: '_id',
                        as: 'chats',
                    },
                },
            ])
            .toArray()
    }

    static async addRelations(body: ChatUserModel) {
        return chatsUsers.collection.insertOne(body)
    }
}
