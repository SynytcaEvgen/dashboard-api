import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import TYPES from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		new Promise((res, rej) => {
			const pro = this.client.$connect();
			res(pro);
		})
			.then(() => {
				this.logger.log('[Prisma] data base should be connected');
			})
			.catch((err) => {
				this.logger.error('[Prisma] data base should not be connected' + err.message);
			});
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
		this.logger.log('[Prisma] data base should be disconnect');
	}
}

export default PrismaService;
