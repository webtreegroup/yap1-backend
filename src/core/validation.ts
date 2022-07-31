import { scrypt } from 'crypto'
import { StoreType } from '../types'

interface ValidateResultProps {
    state: boolean
    fields: string[]
}

const FIELDS_DICTIONARY: StoreType<string> = {
    login: 'логин',
    password: 'пароль',
    firstName: 'имя',
    secondName: 'фамилия',
    email: 'email',
    phone: 'телефон',
    name: 'название',
}

export const MESSAGES = {
    NOT_AUTH: 'Вы не авторизованы',
    FILL_REQUIRED_FIELDS: 'Заполните обязательные поля',
    PASSWORD_IS_NOT_IDENTICAL: 'Пароли не совпадают',
    PASSWORD_INCORRECT: 'Пароль не верный',
    CHAT_DOES_NOT_EXIST: 'Чат не найден',
    CHAT_ADDED_SUCCESSFULLY: 'Чат успешно добавлен',
    CHAT_DELETED_SUCCESSFULLY: 'Чат успешно удален',
    CHAT_UPDATED_SUCCESSFULLY: 'Чат успешно обновлен',
    USER_DOES_NOT_EXIST: 'Пользователь не найден',
    USER_EXISTS: 'Пользователь с таким логином уже зарегистрирован',
    USER_ADDED_SUCCESSFULLY: 'Пользователь успешно добавлен',
    USER_SIGNUP_SUCCESSFULLY: 'Пользователь успешно зарегистриован',
    USER_DELETED_SUCCESSFULLY: 'Пользователь успешно удален',
    USER_UPDATED_SUCCESSFULLY: 'Пользователь успешно обновлен',
    ALREADY_EXIST: 'Запись уже существует',
    SERVER_ERROR: 'Ошибка сервера',
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
    return `${MESSAGES.FILL_REQUIRED_FIELDS}: ${result
        ?.map((el) => FIELDS_DICTIONARY[el])
        .join(', ')}.`
}
