import App from './app';
import  LoggerService  from './logger/logger.service';
import UserController from './users/users.controller';
const logger = new LoggerService();
const app = new App(logger, new UserController(logger));
const main = async () => await app.init();

main();