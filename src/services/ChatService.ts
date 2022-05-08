import { ObjectId } from 'mongodb'
import { chats } from '../db'
import { UserModel } from '../models/UserModel'

export class ChatService {
    static async getAll() {
        return chats.collection.find({}).toArray()
    }

    static async getById(id: string) {
        const details = { _id: new ObjectId(id) }

        return chats.collection.findOne(details)
    }

    static async getByChatName(name: string) {
        const details = { name }

        return chats.collection.findOne(details)
    }

    static async deleteById(id: string) {
        const details = { _id: new ObjectId(id) }

        return chats.collection.deleteOne(details)
    }

    static async updateById(id: string, body: UserModel) {
        const details = { _id: new ObjectId(id) }

        return chats.collection.updateOne(details, body)
    }

    static async create(body: UserModel) {
        return chats.collection.insertOne(body)
    }
}
