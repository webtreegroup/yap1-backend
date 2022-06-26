import { scrypt } from 'crypto'

export interface ValidateResultProps {
    state: boolean
    fields: string[]
}

export function validateRequiredFields<T>(body: T, required: string[]) {
    const result: ValidateResultProps = {
        state: true,
        fields: [],
    }

    Object.keys(body).forEach((fieldKey) => {
        if (!body[fieldKey] && required.includes(fieldKey)) {
            result.fields.push(fieldKey)

            result.state = false
        }
    })

    return result
}

export async function verifyPassword(password: string, hash: string) {
    return new Promise<boolean>((resolve, reject) => {
        const [salt, key] = hash.split(':')

        scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err)

            resolve(key == derivedKey.toString('hex'))
        })
    })
}
