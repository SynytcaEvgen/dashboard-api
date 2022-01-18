import { injectable } from 'inversify';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';
import UserEntity from './user.entity';
import IUserService from './users.service.interface';

@injectable()
class UsersService implements IUserService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserEntity | null> {
		const newUser = new UserEntity(email, name);
		await newUser.setPasword(password);
		return newUser;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}

export default UsersService;
