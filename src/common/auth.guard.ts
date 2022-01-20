import IMiddleware from './middleware.interface';
import { Request, Response, NextFunction } from 'express';

class AuthGuard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}
		res.status(401).send({ error: 'Authotization failed' });
		next();
	}
}

export default AuthGuard;
