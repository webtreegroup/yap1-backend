import { NextFunction, Request, Response } from 'express'
import { MESSAGES } from '../core/validation'
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
        res.statusMessage = MESSAGES.NOT_AUTH

        res.status(401).send()
    }
}
