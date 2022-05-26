import { ChatMapper } from '../chat/ChatMapper'
import { UserMapper } from '../user/UserMapper'
import {
    ChatUsersDto,
    ChatUsersContract,
    UserChatsDto,
    UserChatsContract,
} from './ChatUserModel'

export class ChatsUsersMapper {
    static mapUsers(chatUsers: ChatUsersDto[]) {
        return chatUsers.map<ChatUsersContract>((el) => ({
            id: el._id,
            name: el.name,
            ownerId: el.ownerId,
            users: UserMapper.mapUsers(el.users),
        }))[0]
    }

    static mapChats(userChats: UserChatsDto[]) {
        return userChats.map<UserChatsContract>(
            ({ chats, userChats, ...rest }) => ({
                ...rest,
                chats: ChatMapper.mapChats(chats),
            }),
        )[0]
    }
}
