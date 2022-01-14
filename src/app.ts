import { Server } from 'http';
import express, { Request, Response, NextFunction, Express } from 'express';
import UserController from './users/users.controller';
import LoggerService from "./logger/logger.service"

class App { 
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    userController: UserController;

    constructor(
        logger: LoggerService,
        userController: UserController
    ) {
        this.app = express();
        this.port = 5000;
        this.logger = logger;
        this.userController = userController;
    }
    useRoutes() { 
        this.app.use('/users', this.userController.router);
    }

    useExeptionFilters() { 

    }
    public async init() {
        this.useRoutes();
        this.useExeptionFilters();
        this.server = this.app.listen(this.port);

        this.logger.log(`Server run to port - ${this.port}`)

    }
}

export default App;