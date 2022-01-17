import { Server } from 'http';
import express, { Request, Response, NextFunction, Express } from 'express';
import UserController from './users/users.controller';
import LoggerService from "./logger/logger.service";
import ExeptionFilter from "./errors/exeption.filter";
import { ILogger } from './logger/logger.interface';

class App { 
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    userController: UserController;
    exeptionFilter: ExeptionFilter;

    constructor(
        logger: ILogger,
        userController: UserController,
        exeptionFilter: ExeptionFilter
    ) {
        this.app = express();
        this.port = 5000;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
    }
    useRoutes() { 
        this.app.use('/users', this.userController.router);
    }

    useExeptionFilters() { 
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }
    public async init() {
        this.useRoutes();
        this.useExeptionFilters();
        this.server = this.app.listen(this.port);

        this.logger.log(`Server run to port - ${this.port}`)

    }
}

export default App;