import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class UserRegisterDto {
	@IsEmail({}, { message: 'Not rigth email' })
	@IsNotEmpty({ message: 'Email field not be empty' })
	email: string;
	@IsString({ message: 'Please write password' })
	@IsNotEmpty({ message: 'Password field not be empty' })
	password: string;
	@IsString({ message: 'Please write user name' })
	@IsNotEmpty({ message: 'Name field not be empty' })
	name: string;
}

export default UserRegisterDto;
