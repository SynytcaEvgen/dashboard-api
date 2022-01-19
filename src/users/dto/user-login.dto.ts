import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class UserLoginDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;
	@IsNotEmpty()
	@IsString()
	password: string;
}

export default UserLoginDto;
