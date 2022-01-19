import LoggerService from '../logger/logger.service';
import BaseController from '../common/base.controller';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import IUserController from './users.interface';
import UserRegisterDto from './dto/user-register.dto';
import UserLoginDto from './dto/user-login.dto';
import UsersService from './users.service';
import UserEntity from './user.entity';
import HttpError from '../errors/http-errors.class';
import ValidateMiddleware from '../common/validate.middleware';

@injectable()
class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: LoggerService,
		@inject(TYPES.UserService) private userService: UsersService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{ path: '/login', method: 'post', func: this.login, middlewares: [] },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		// next(new HttpError(401, 'authorisation error'))

		console.log(req.body);
		this.ok(res, 'login');
		next();
	}
	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HttpError(422, `User ${body.name} it is exist`));
		}
		this.ok(res, { email: result.email, id: result.id });
		// next();
	}
}

export default UserController;
