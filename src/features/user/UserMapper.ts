import { WithId } from 'mongodb'
import { UserModel } from './UserModel'

export class UserMapper {
    static mapUser(user: WithId<UserModel>) {
        return {
            id: user._id,
            login: user.login,
            firstName: user.firstName,
            secondName: user.secondName,
            email: user.email,
            phone: user.phone,
        }
    }

    static mapUsers(users: WithId<UserModel>[]) {
        return users.map(UserMapper.mapUser)
    }
}
