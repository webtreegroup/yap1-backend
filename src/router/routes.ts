import { Express } from 'express'
import { Db } from 'mongodb'
import { UserModel } from '../models/UserModel'
import { RouterHelper } from './RouterHelper'

export function composeRoutes(server: Express, db: Db) {
    new RouterHelper<UserModel>('users', server, db)
}
