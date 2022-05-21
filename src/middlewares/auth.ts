import { NextFunction, Request, Response } from 'express'
import { ERROR_MESSAGES, AUTH_TOKEN_SECRET_KEY } from '../server.config'
import { validateToken } from '../utils'

export interface ReqWithTokenPayload extends Request {
    userId: string
    userEmail: string
}

export function auth(
    req: ReqWithTokenPayload,
    res: Response,
    next: NextFunction,
) {
    try {
        const data = validateToken(req.cookies.access_token)

        req.userId = data.id
        req.userEmail = data.email

        return next()
    } catch {
        res.status(401).json({
            message: ERROR_MESSAGES[401],
        })
    }
}
