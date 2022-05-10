import { ObjectId } from 'mongodb'
import { chats, chatsUsers } from '../../db'
import { ChatUserDto, ChatUserModel } from './ChatUserModel'

export class ChatUserService {
    static async getChatUsers(id: string) {
        return chats.collection
            .aggregate<ChatUserDto>([
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: 'chatsUsers',
                        localField: '_id',
                        foreignField: 'chatId',
                        as: 'chatsUsers',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'chatsUsers.userId',
                        foreignField: '_id',
                        as: 'users',
                    },
                },
            ])
            .toArray()
    }

    static async addRelations(body: ChatUserModel) {
        return chatsUsers.collection.insertOne(body)
    }
}
