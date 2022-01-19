import { Request, Response, NextFunction, Router } from 'express';

interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
}

export default IUserController;
