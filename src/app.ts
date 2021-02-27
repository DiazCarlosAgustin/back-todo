// imports
import express from 'express'
import { createConnection } from 'typeorm'
import cors = require('cors')
import 'reflect-metadata'
import path from 'path'

//  import routes
import userRouter from './routes/user.routes'
import authRouter from './routes/aurh.routes'
import todoRouter from './routes/todo.routes'

export class App {
    app: express.Application

    constructor(private port?: number | string) {
        this.app = express()
        this.middleware()
        this.routes()
        this.settings()
        createConnection()
    }

    settings() {
        this.app.set("port", this.port || process.env.PORT || 3000)
    }

    middleware() {
        this.app.use(cors())
        this.app.use(express.json())
    }

    routes() {
        this.app.use('/user/', userRouter)
        this.app.use('/auth/', authRouter)
        this.app.use('/todo/', todoRouter)
    }

    async listen() {
        await this.app.listen(this.app.get("port"))
        console.log("server on port: ", this.app.get("port"))
    }
}