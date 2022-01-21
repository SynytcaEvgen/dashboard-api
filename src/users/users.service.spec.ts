import 'reflect-metadata';
import { Container } from 'inversify';
import { UserModel } from '@prisma/client';

import IConfigService from '../config/consfig.service.interface';
import IUsersRepository from './users.repository.interface';
import IUserService from './users.service.interface';
import UserEntity from './user.entity';
import UsersService from './users.service';
import TYPES from '../types';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UserRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let userService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UsersService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UserRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});

let createUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce(1); // эмитация конфига
		usersRepository.create = jest.fn().mockImplementationOnce(
			// эмитация создания пользователя
			(user: UserEntity): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 3,
			}),
		);
		createUser = await userService.createUser({
			email: 'ksdjf@ddd.ff',
			name: 'Uasia',
			password: 'sd',
		});
		expect(createUser?.id).toEqual(3);
		expect(createUser?.password).not.toEqual('1');
	});

	it('validation - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createUser); // эмитация вызова метода
		const res = await userService.validateUser({
			// тестируем userService вносим входящие параметры
			email: 'ksdjf@ddd.ff',
			password: 'sd',
		});
		expect(res).toBeTruthy();
	});

	it('validation - wrong password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createUser);
		const res = await userService.validateUser({
			email: 'ksdjf@ddd.ff',
			password: 'sdw',
		});
		expect(res).toBeFalsy();
	});

	it('validation - wrong user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const res = await userService.validateUser({
			email: 'dddjf@ddd.ff',
			password: 'sd',
		});
		expect(res).toBeFalsy();
	});
});
