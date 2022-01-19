import { hash } from 'bcryptjs';

class UserEntity {
	private _password: string;
	constructor(private readonly _email: string, private readonly _name: string) {}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPasword(data: string, salt: number): Promise<void> {
		this._password = await hash(data, salt);
	}
}

export default UserEntity;
