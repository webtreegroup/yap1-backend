import { Express } from 'express'
import { Collection, Db, WithId } from 'mongodb'
import { ObjectId } from 'mongodb'

export class RouterHelper<T> {
    private _route: string
    private _server: Express
    private _db: Db
    private _collection: Collection<T>

    her = { a: 1, b: 2 }

    constructor(route: string, server: Express, db: Db) {
        this._route = route
        this._server = server
        this._db = db
        this._collection = this._db.collection<T>(this._route)

        this.init()
    }

    private init() {
        this._server.get(`/${this._route}/:id`, (req, res) => {
            const id = req.params.id
            const details = { _id: new ObjectId(id) } as WithId<T>

            this._collection.findOne(details, (err, item) => {
                if (err) {
                    res.send({ error: 'An error has occurred' })
                } else {
                    res.send(item)
                }
            })
        })

        this._server.delete(`/${this._route}/:id`, (req, res) => {
            const id = req.params.id
            const details = { _id: new ObjectId(id) } as WithId<T>

            this._collection.deleteOne(details, (err) => {
                if (err) {
                    res.send({ error: 'An error has occurred' })
                } else {
                    res.send('Note ' + id + ' deleted!')
                }
            })
        })

        this._server.put(`/${this._route}/:id`, (req, res) => {
            const id = req.params.id
            const details = { _id: new ObjectId(id) } as WithId<T>

            this._collection.updateOne(details, req.body, (err, result) => {
                if (err) {
                    res.send({ error: 'An error has occurred' })
                } else {
                    res.send(result)
                }
            })
        })

        this._server.get(`/${this._route}`, (_, res) => {
            this._collection
                .find({})
                .toArray()
                .then((result) => {
                    res.send(result)
                })
        })

        this._server.post(`/${this._route}`, (req, res) => {
            this._collection.insertOne(req.body, (err, result) => {
                if (err) {
                    res.send({ error: 'An error has occurred' })
                } else {
                    res.send(result)
                }
            })
        })
    }
}
