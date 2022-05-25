import { ObjectId } from 'mongodb'

export interface ChatModel {
    name: string
    ownerId: string
}

export interface ChatContract extends ChatModel {
    id: ObjectId
}
