import { Request, Response } from 'express'
import { AUTH_TOKEN_SECRET_KEY } from '../../server.config'
import * as jwt from 'jsonwebtoken'
import { UserService } from '../user/UserService'
import { getPasswordHash } from '../../utils'
import { verifyPassword } from './AuthValidators'
import { SignInContract, SignUpContract } from './AuthModel'
import {
    getValidationMessage,
    validateRequiredFields,
    MESSAGES,
} from '../../core/validation'

export class AuthController {
    static async signIn(req: Request<SignInContract>, res: Response) {
        const validateResult = validateRequiredFields(req.body, [
            'password',
            'login',
        ])

        if (!validateResult.state) {
            res.statusMessage = getValidationMessage(validateResult.fields)

            return res.status(400)
        }

        const user = await UserService.getByLogin(req.body.login)

        const isPasswordValid = await verifyPassword(
            req.body.password,
            user.password,
        )

        if (!isPasswordValid) {
            res.statusMessage = MESSAGES.PASSWORD_INCORRECT

            return res.status(401)
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            AUTH_TOKEN_SECRET_KEY,
        )

        res.cookie('access_token', token, {
            httpOnly: true,
        }).status(200)
    }

    static async signUp(req: Request<SignUpContract>, res: Response) {
        const validateResult = validateRequiredFields(req.body, [
            'firstName',
            'secondName',
            'login',
            'email',
            'phone',
            'password',
        ])

        if (!validateResult.state) {
            res.statusMessage = getValidationMessage(validateResult.fields)

            return res.status(400)
        }

        if (req.body.password !== req.body.passwordConfirm) {
            res.statusMessage = MESSAGES.PASSWORD_IS_NOT_IDENTICAL

            return res.status(400)
        }

        const user = await UserService.getByLogin(req.body.login)

        if (user) {
            res.statusMessage = MESSAGES.USER_EXISTS

            return res.status(400)
        }

        const password = await getPasswordHash(req.body.password)

        const result = await UserService.create({
            ...req.body,
            password,
        })

        if (!result) {
            res.statusMessage = MESSAGES.SERVER_ERROR

            res.status(500)
        } else {
            res.statusMessage = MESSAGES.USER_SIGNUP_SUCCESSFULLY

            res.status(200)
        }
    }

    static logout(_: Request, res: Response) {
        return res.clearCookie('access_token').status(200)
    }
}
