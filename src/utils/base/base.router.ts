import { Router, Request, Response, NextFunction } from 'express'

export abstract class BaseRouter {
	public router: Router
	private controller: any

	constructor(controller: any) {
		this.controller = controller
		this.router = Router()
	}
	protected handler(action: () => void): any {
		return (req: Request, res: Response, next: NextFunction) => action.call(new this.controller(req, res, next))
	}
}
