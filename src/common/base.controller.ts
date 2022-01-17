import IControllerRoute from './route.interface'
import { Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
abstract class BaseController { 
    private readonly _router: Router;
    constructor(private logger: ILogger) { 
        this._router = Router();
    }

    get router() { 
        return this._router;
    }
    public send<T>(res: Response, code: StatusCodes, message: T) {
        res.type('application/json');
        return res.status(code).json
    }

    public ok<T>(res: Response, message: T) {
        return this.send<T>(res, 200, message);
    }
    public created(res: Response) { 
        return res.sendStatus(201);
    }
    protected bindRoutes(routes: IControllerRoute[]) { 
        for(const route of routes) { 
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);// привязываем контекст или передаем контекст 
            this.router[route.method](route.path, handler) // для route.func конетекст будет утерян
        }
    }

};

export default BaseController;