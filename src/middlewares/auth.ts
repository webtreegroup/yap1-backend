import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { ERROR_MESSAGES, SECRET_KEY } from '../consts'

export interface ReqWithTokenPayload extends Request {
    userId: string
    userPosition: string
}

export function auth(
    req: ReqWithTokenPayload,
    res: Response,
    next: NextFunction,
) {
    const token = req.cookies.access_token

    if (!token)
        return res.status(403).json({
            message: ERROR_MESSAGES[403],
        })

    try {
        const data = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload

        req.userId = data.id
        req.userPosition = data.role

        return next()
    } catch {
        return res.status(403).json({
            message: ERROR_MESSAGES[403],
        })
    }
}
