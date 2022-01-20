import LoggerService from '../logger/logger.service';
import BaseController from '../common/base.controller';
import { Request, Response, NextFunction } from 'express';
import { id, inject, injectable } from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import IUserController from './users.interface';
import UserRegisterDto from './dto/user-register.dto';
import UserLoginDto from './dto/user-login.dto';
import UsersService from './users.service';
import HttpError from '../errors/http-errors.class';
import ValidateMiddleware from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import IConfigService from '../config/consfig.service.interface';
import AuthGuard from '../common/auth.guard';

@injectable()
class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: LoggerService,
		@inject(TYPES.UserService) private userService: UsersService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(body);

		if (!result) {
			return next(new HttpError(401, `Authorithation failed`));
		}
		const jwt = await this.signJWT(body.email, this.configService.get('SECRET'));
		this.ok(res, { jwt });
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
	}

	async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		if (user) {
			const { email } = user;
			const userInfo = await this.userService.getUserInfo(email);
			this.ok(res, { email: userInfo?.email, id: userInfo?.id });
		} else {
			return;
		}
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((res, rej) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						rej(err);
					}
					res(token as string);
				},
			);
		});
	}
}

export default UserController;
