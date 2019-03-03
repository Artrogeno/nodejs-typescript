import { Request, Response, NextFunction } from 'express'

export abstract class BaseController {
	public req: Request
	public res: Response
	public next: NextFunction

	constructor(req: Request, res: Response, next: NextFunction) {
		this.req = req
		this.res = res
		this.next = next
	}
}
