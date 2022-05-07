import { randomBytes, scrypt } from 'crypto'
import { WithId } from 'mongodb'
import { UserModel } from './models/UserModel'

export async function getPasswordHash(password: string) {
    return new Promise<string>((resolve, reject) => {
        const salt = randomBytes(16).toString('hex')

        scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err)

            resolve(salt + ':' + derivedKey.toString('hex'))
        })
    })
}

export function mapUser(user: WithId<UserModel>) {
    return {
        id: user._id,
        login: user.login,
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
        phone: user.phone,
    }
}

export function mapUsers(users: WithId<UserModel>[]) {
    return users.map(mapUser)
}
