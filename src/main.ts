import App from './app';
import ExeptionFilter from './errors/exeption.filter';
import LoggerService  from './logger/logger.service';
import UserController from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import IExeptionFilter from './errors/exeption.filter.interface';
import TYPES from './types';
import { Container } from 'inversify';
import 'reflect-metadata';

// const logger = new LoggerService();
// const app = new App(logger, new UserController(logger), new ExeptionFilter(logger));

// const main = async () => await app.init(); 
// main();


const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Aplication).to(App);

const app = appContainer.get<App>(TYPES.Aplication);

app.init(); 


export { app, appContainer }