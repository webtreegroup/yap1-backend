import WebSocket = require('ws')
import { ObjectId } from 'mongodb'
import { chats } from '../../db'
import { ChatModel } from './ChatModel'
import { server } from '../../server'

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

    static async updateById(id: string, body: ChatModel) {
        const details = { _id: new ObjectId(id) }

        return chats.collection.updateOne(details, body)
    }

    static async create(body: ChatModel) {
        return chats.collection.insertOne(body)
    }

    static connectToChat(userId: string, chatId: string) {
        const ws = new WebSocket.Server({
            server,
            path: `/ws/${userId}/${chatId}`,
        })

        const clients = new Set<WebSocket.WebSocket>()

        ws.on('connection', () => {
            console.info('User connect to chat!')
        })

        ws.on('message', (message, isBinary) => {
            clients.forEach((client) => {
                client.send(message, { binary: isBinary })
            })
        })

        ws.on('close', () => {
            console.info('WS connection is closed!')
        })
    }
}
