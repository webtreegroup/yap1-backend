import { Request, Response } from 'express'
import { ERROR_MESSAGES, AUTH_TOKEN_SECRET_KEY } from '../../server.config'
import * as jwt from 'jsonwebtoken'
import { UserService } from '../user/UserService'
import { getPasswordHash } from '../../utils'
import { validateRequiredFields, verifyPassword } from './AuthValidators'
import { SignInContract, SignUpContract } from './AuthModel'

export class AuthController {
    static async signIn(req: Request<SignInContract>, res: Response) {
        const validateResult = validateRequiredFields(req.body, [
            'password',
            'login',
        ])

        if (!validateResult.state) {
            return res.status(400).json({ fields: validateResult.fields })
        }

        const user = await UserService.getByLogin(req.body.login)

        const isPasswordValid = await verifyPassword(
            req.body.password,
            user.password,
        )

        if (!isPasswordValid) {
            return res.status(401).json({ message: ERROR_MESSAGES[401] })
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
        })
            .status(200)
            .json({ message: 'Sign in successfully!' })
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
            return res.status(400).json({ fields: validateResult.fields })
        }

        if (req.body.password !== req.body.passwordConfirm) {
            return res.status(400).json({ fields: validateResult.fields })
        }

        const user = await UserService.getByLogin(req.body.login)

        if (user) {
            return res
                .status(400)
                .json({ error: 'The same user exists already!' })
        }

        const password = await getPasswordHash(req.body.password)

        const result = await UserService.create({
            ...req.body,
            password,
        })

        if (!result) {
            res.status(500).json({ message: ERROR_MESSAGES[500] })
        } else {
            res.status(200).json({
                message: 'Sign up successfully!',
                result,
            })
        }
    }

    static logout(_: Request, res: Response) {
        return res
            .clearCookie('access_token')
            .status(200)
            .json({ message: 'Logged out successfully!' })
    }
}
