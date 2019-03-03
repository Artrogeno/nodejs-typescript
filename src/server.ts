import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import http from 'http'
import cors from 'cors'
import methodOverride from 'method-override'

import { ConfigRouter } from './config/router'

export class Server {
	private static connectDB(): Promise<any> {
		// return connection
		return new Promise((resolve) => {
			resolve('ok')
		})
	}

	private readonly express: express.Application
	private readonly router: express.Router
	private readonly server: http.Server

	constructor() {
		this.router = new ConfigRouter().router
		this.express = express()
		this.server = http.createServer(this.express)
	}

	public async start(): Promise<http.Server> {
		// return await new Promise((resolve, reject) => {
		// 	this.expressConfig()
		// 	this.routerConfig()
		// 	if(!this.server) {reject('Error in start!')}
		// 	else {resolve(this.server)}
		// })
		return Server.connectDB().then(() => {
			this.expressConfig()
			this.routerConfig()
			return this.server
		})
	}

	public app(): express.Application {
		return this.express
	}

	private expressConfig(): void {
		this.express.use(bodyParser.urlencoded({ extended: true }))
		this.express.use(bodyParser.json({ limit: '20mb' }))
		this.express.use(methodOverride())
		this.express.use((req, res, next): void => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
			next();
		})
		this.express.use(morgan('combined'))
		this.express.use(cors())
		this.express.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
			error.status = 404
			next(error)
		})
	}

	private routerConfig(): void {
		this.express.get('/test', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
			res.status(200).json({test: 'server it\'s works!  <br/><br/> :)'});
		});
		this.express.use(this.router)
		this.express.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
			res.status(404)
			res.json({ error: 'Not found' })
			next()
		})
		this.express.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
			if (error.name === 'UnauthorizedError') {
				res.status(401).json({ error: 'Please send a valid token...' })
			}
			next()
		})
		this.express.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
			res.status(error.status || 500)
			res.json({ error: error.message })
			next()
		})
	}
}
