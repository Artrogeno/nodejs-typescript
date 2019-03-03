import { BaseRouter } from './../../../utils/base'
import { HomeController } from './home.controller'

export class HomeRouter extends BaseRouter {
	constructor() {
		super(HomeController)
		this.router.get('/', this.handler(HomeController.prototype.getAll))
	}
}
