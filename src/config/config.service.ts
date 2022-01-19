import IConfigService from './consfig.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import TYPES from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] error reading .env file please cheack this file');
		} else {
			this.logger.log('[ConfigService] Configuration .env be loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get<T extends number | string>(key: string): T {
		const numb = Number(this.config[key]);
		const str = this.config[key];
		if (isNaN(numb)) {
			return str as T;
		} else {
			return numb as T;
		}
	}
}

export default ConfigService;
