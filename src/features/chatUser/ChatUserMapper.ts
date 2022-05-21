import { UserMapper } from '../user/UserMapper'
import { ChatUserDto, ChatUsersContract } from './ChatUserModel'

export class ChatUserMapper {
    static mapUsers(chatUsers: ChatUserDto[]): ChatUsersContract {
        return chatUsers.map((el) => ({
            name: el.name,
            ownerId: el.ownerId,
            users: UserMapper.mapUsers(el.users),
        }))[0]
    }
}
