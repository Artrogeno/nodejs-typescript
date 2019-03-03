import { Request, Response, NextFunction } from 'express'

import { BaseController } from './../../../utils/base'

export class HomeController extends BaseController {

	constructor(req: Request, res: Response, next: NextFunction) {
		super(req, res, next)
	}

	public getAll() {
		return this.res.json({ test: 'Opa it\'s works!' })
	}
}
