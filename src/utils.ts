import { randomBytes, scrypt } from 'crypto'
import { AUTH_TOKEN_SECRET_KEY } from './server.config'
import * as jwt from 'jsonwebtoken'

export async function getPasswordHash(password: string) {
    return new Promise<string>((resolve, reject) => {
        const salt = randomBytes(16).toString('hex')

        scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err)

            resolve(salt + ':' + derivedKey.toString('hex'))
        })
    })
}

export function validateToken(token?: string) {
    try {
        if (!token) throw new Error()

        return jwt.verify(token, AUTH_TOKEN_SECRET_KEY) as jwt.JwtPayload
    } catch (err) {
        throw new Error(err)
    }
}

export function parseToken(cookie: string) {
    return cookie
        .split('; ')
        .find((str) => str.includes('access_token'))
        ?.split('=')[1]
}
