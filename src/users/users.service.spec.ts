import { Container, id } from 'inversify';
import IConfigService from '../config/consfig.service.interface';
import TYPES from '../types';
import UserEntity from './user.entity';
import { UserModel } from '@prisma/client';
import IUsersRepository from './users.repository.interface';
import UsersService from './users.service';
import IUserService from './users.service.interface';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UserRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService, usersRepository: IUsersRepository, userService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UsersService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UserRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: UserEntity): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		const createUser = await userService.createUser({
			email: 'ksdjf@ddd.ff',
			name: 'Uasia',
			password: 'sd',
		});
		expect(createUser?.id).toEqual(1);
		expect(createUser?.password).not.toEqual('1');
	});
});
