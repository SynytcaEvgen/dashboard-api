import App from './app';
import ExeptionFilter from './errors/exeption.filter';
import LoggerService from './logger/logger.service';
import UserController from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import IExeptionFilter from './errors/exeption.filter.interface';
import TYPES from './types';
import { Container, ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';
import IUserController from './users/users.interface';

// const logger = new LoggerService();
// const app = new App(logger, new UserController(logger), new ExeptionFilter(logger));

// const main = async () => await app.init();
// main();

interface IMainReturn {
	appContainer: Container;
	app: App;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Aplication).to(App);
});

function main(): IMainReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Aplication);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = main();
export { appBindings };
