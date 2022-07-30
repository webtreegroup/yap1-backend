import { scrypt } from 'crypto'
import { StoreType } from '../../types'

export interface ValidateResultProps {
    state: boolean
    fields: string[]
}

export const FIELDS_DICTIONARY: StoreType<string> = {
    login: 'логин',
    password: 'пароль',
    firstName: 'имя',
    secondName: 'фамилия',
    email: 'email',
    phone: 'телефон',
}

export const VALIDATION_MESSAGES = {
    FAILED: 'Заполните обязательные поля',
    USER_EXISTS: 'Пользователь с таким логином уже зарегистрирован',
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

export function getValidationMessage(result: string[]): string {
    return `${VALIDATION_MESSAGES.FAILED}: ${result
        ?.map((el) => FIELDS_DICTIONARY[el])
        .join(', ')}.`
}
