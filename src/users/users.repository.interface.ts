import { UserModel } from '@prisma/client';
import UserEntity from './user.entity';

interface IUsersRepository {
	create: (user: UserEntity) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
}

export default IUsersRepository;
