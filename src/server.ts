import express = require('express')
import http = require('http')
import WebSocket = require('ws')
import cookieParser = require('cookie-parser')
import { parse } from 'url'
import { composeRoutes } from './router'
import { composeMiddlewares } from './middlewares/composer'
import { DataBase } from './db'
import { SERVER_PORT } from './server.config'
import { ReqWithTokenPayload } from './middlewares/auth'
import { parseToken, validateToken } from './utils'

const app = express()

export const server = http.createServer(app)
export const ws = new WebSocket.Server({
    noServer: true,
})

composeMiddlewares(app)
composeRoutes(app)

server.on('upgrade', (req: ReqWithTokenPayload, socket, head) => {
    const { pathname } = parse(req.url, false)

    try {
        validateToken(parseToken(req.headers.cookie))
    } catch {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        socket.destroy()

        return
    }

    if (pathname.includes('/ws')) {
        ws.handleUpgrade(req, socket, head, function done(ws) {
            ws.emit('connection', ws, req)
        })
    } else {
        socket.destroy()
    }
})

ws.on('connection', (client, request) => {
    console.info('User connect to chat!')

    ws.on('message', (data, isBinary) => {
        ws.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary })
            }
        })
    })

    ws.on('close', () => {
        console.info('WS connection is closed!')
    })
})

async function startApp() {
    await DataBase.connect()

    console.log('Databse Connected successfully to server!')
}

startApp()
    .then(() => {
        server.listen(SERVER_PORT, () => {
            console.log(`Server port is: ${SERVER_PORT}!`)
        })
    })
    .catch(console.error)
