import { injectable, inject } from 'inversify';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';
import UserEntity from './user.entity';
import IUserService from './users.service.interface';
import TYPES from '../types';
import IConfigService from '../config/consfig.service.interface';
import IUsersRepository from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
class UsersService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, password, name }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new UserEntity(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPasword(password, salt as number);
		const existUser = await this.usersRepository.find(email);
		if (!existUser) {
			return this.usersRepository.create(newUser);
		} else {
			return null;
		}
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}

export default UsersService;
