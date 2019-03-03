import { Router } from 'express'

import { HomeRouter } from './modules/home/home.router'

export class ApiRouter {
	public router: Router

	constructor() {
		this.router = Router()
		this.providerRoutes()
	}

	public providerRoutes() {
		this.router.use('/home', new HomeRouter().router)
	}
}
