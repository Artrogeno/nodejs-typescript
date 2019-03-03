import { Router } from 'express'

import { ApiRouter } from './../api/router'

export class ConfigRouter {
	public router: Router

	constructor() {
		this.router = Router()
		this.providerRoutes()
	}

	public providerRoutes() {
		this.router.use('/api', new ApiRouter().router)
	}
}
// // define the api page route
// router.get('/test2', (req: Request, res: Response, next: NextFunction) => {
// 	res.send('Birds home page')
// 	next()
// })
