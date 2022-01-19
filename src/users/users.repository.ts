import { UserModel } from '@prisma/client';
import { injectable, inject } from 'inversify';
import UserEntity from './user.entity';
import IUsersRepository from './users.repository.interface';
import TYPES from '../types';
import PrismaService from '../database/prisma.service';

@injectable()
class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, password, name }: UserEntity): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}

export default UsersRepository;
