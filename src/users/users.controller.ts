import LoggerService from "../logger/logger.service";
import BaseController from '../common/base.controller';
import { Request, Response, NextFunction } from "express";
import HttpError from "../errors/http-errors.class";


class UserController extends BaseController {
    constructor(
        logger: LoggerService
    ) {
        super(logger);
        this.bindRoutes([
            { path: '/register', method: 'post', func: this.register },
            { path: '/login', method: 'post', func: this.login }
        ])

    }

    login(req: Request, res: Response, next: NextFunction) {
        next(new HttpError(401, 'authorisation error'))
        // this.ok(res, 'login');
    };
    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register');
        
    };
};

export default UserController;