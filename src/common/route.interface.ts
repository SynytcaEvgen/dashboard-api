import { NextFunction, Request, Response, Router } from 'express';
import IMiddleware from './middleware.interface';

interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	middlewares?: IMiddleware[];
}

type ExpressRouteType = Response<any, Record<string, any>>;

export { ExpressRouteType };
export default IControllerRoute;
