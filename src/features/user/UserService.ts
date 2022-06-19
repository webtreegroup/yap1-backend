import { ObjectId } from 'mongodb'
import { users } from '../../db'
import { UserModel } from './UserModel'

export class UserService {
    static async getAll() {
        return users.collection.find({}).toArray()
    }

    static async getById(id: string) {
        const details = { _id: new ObjectId(id) }

        return users.collection.findOne(details)
    }

    static async getByLogin(login: string) {
        const details = { login }

        return users.collection.findOne(details)
    }

    static async deleteById(id: string) {
        const details = { _id: new ObjectId(id) }

        return users.collection.deleteOne(details)
    }

    static async updateById(id: string, body: UserModel) {
        const details = { _id: new ObjectId(id) }

        return users.collection.updateOne(details, { $set: body })
    }

    static async create(body: UserModel) {
        return users.collection.insertOne(body)
    }
}
