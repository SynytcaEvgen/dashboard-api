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
import IUserService from './users/users.service.interface';
import UsersService from './users/users.service';
import IConfigService from './config/consfig.service.interface';
import ConfigService from './config/config.service';
import PrismaService from './database/prisma.service';
import IUsersRepository from './users/users.repository.interface';
import UsersRepository from './users/users.repository';

// const logger = new LoggerService();
// const app = new App(logger, new UserController(logger), new ExeptionFilter(logger));

// const main = async () => await app.init();
// main();

interface IMainReturn {
	appContainer: Container;
	app: App;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UsersService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
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
