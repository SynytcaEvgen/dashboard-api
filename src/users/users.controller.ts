import LoggerService from "../logger/logger.service";
import BaseController from '../common/base.controller';
import { Request, Response, NextFunction } from "express";
import HttpError from "../errors/http-errors.class";
import { inject, injectable } from "inversify";
import TYPES from "../types";
import 'reflect-metadata';
import IUserController from "./users.interface";


@injectable()
class UserController extends BaseController implements IUserController {
    constructor(
        @inject(TYPES.ILogger) private loggerService: LoggerService
    ) {
        super(loggerService);
        this.bindRoutes([
            { path: '/register', method: 'post', func: this.register },
            { path: '/login', method: 'post', func: this.login }
        ])

    }

    login(req: Request, res: Response, next: NextFunction) {
        // next(new HttpError(401, 'authorisation error'))
        this.ok(res, 'login');
        next();
    };
    register(req: Request, res: Response, next: NextFunction) {
        
        this.ok(res, 'register');
        
        next();
        
    };
};

export default UserController;