import { UserModel } from '../models/UserModel'

export function validateSignUp(body: UserModel) {
    if (!body.password || !body.login) return false

    return true
}
