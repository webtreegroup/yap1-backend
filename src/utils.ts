import { randomBytes, scrypt } from 'crypto'

export async function getPasswordHash(password: string) {
    return new Promise<string>((resolve, reject) => {
        const salt = randomBytes(16).toString('hex')

        scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err)

            resolve(salt + ':' + derivedKey.toString('hex'))
        })
    })
}
