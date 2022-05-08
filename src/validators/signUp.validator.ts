import { UserModel } from '../features/user/UserModel'

export function validateSignUp(body: UserModel) {
    if (!body.password || !body.login) return false

    return true
}
