import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { ERROR_MESSAGES, AUTH_TOKEN_SECRET_KEY } from '../server.config'

export interface ReqWithTokenPayload extends Request {
    userId: string
    userEmail: string
}

export function auth(
    req: ReqWithTokenPayload,
    res: Response,
    next: NextFunction,
) {
    const closeConnection = () => {
        res.status(403).json({
            message: ERROR_MESSAGES[403],
        })
    }

    const token = req.cookies.access_token

    if (!token) {
        closeConnection()

        return
    }

    try {
        const data = jwt.verify(token, AUTH_TOKEN_SECRET_KEY) as jwt.JwtPayload

        req.userId = data.id
        req.userEmail = data.email

        return next()
    } catch {
        closeConnection()

        return
    }
}
