import { WithId } from 'mongodb'
import { ChatModel } from './ChatModel'

export class ChatMapper {
    static mapChat(chat: WithId<ChatModel>) {
        return {
            id: chat._id,
            name: chat.name,
            ownerId: chat.ownerId,
        }
    }

    static mapChats(users: WithId<ChatModel>[]) {
        return users.map(ChatMapper.mapChat)
    }
}
