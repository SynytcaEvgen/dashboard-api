import { Server } from 'http';
import express, { Express } from 'express';
import UserController from './users/users.controller';
import LoggerService from "./logger/logger.service";
import ExeptionFilter from "./errors/exeption.filter";
import { inject, injectable } from 'inversify';
import TYPES from './types';
import 'reflect-metadata';

@injectable()
class App { 
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: LoggerService,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
        
    ) {
        this.app = express();
        this.port = 5000;
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