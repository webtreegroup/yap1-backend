import { scrypt } from 'crypto'
import { StoreType } from '../types'

interface ValidateResultProps {
    state: boolean
    fields: string[]
}

const FIELDS_DICTIONARY: StoreType<string> = {
    login: 'login',
    password: 'password',
    firstName: 'name',
    secondName: 'surname',
    email: 'email',
    phone: 'telephone',
    name: 'title',
}

export const MESSAGES = {
    NOT_AUTH: 'You are not logged in',
    FILL_REQUIRED_FIELDS: 'Fill in the required fields',
    PASSWORD_IS_NOT_IDENTICAL: "Passwords don't match",
    PASSWORD_INCORRECT: 'The password is not correct',
    CHAT_DOES_NOT_EXIST: 'Chat not found',
    CHAT_ADDED_SUCCESSFULLY: 'Chat successfully added',
    CHAT_DELETED_SUCCESSFULLY: 'Chat successfully deleted',
    CHAT_UPDATED_SUCCESSFULLY: 'Chat successfully updated',
    USER_DOES_NOT_EXIST: 'User not found',
    USER_EXISTS: 'A user with this username is already registered',
    USER_ADDED_SUCCESSFULLY: 'User successfully added',
    USER_SIGNUP_SUCCESSFULLY: 'The user has been successfully registered',
    USER_DELETED_SUCCESSFULLY: 'The user has been successfully deleted',
    USER_UPDATED_SUCCESSFULLY: 'The user has been successfully updated',
    ALREADY_EXIST: 'The record already exists',
    SERVER_ERROR: 'Server error',
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
