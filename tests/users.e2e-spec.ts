import App from '../src/app';
import { mainPromise } from '../src/main';
import request from 'supertest';
import app from '../src/app';

let application: App;

beforeAll(async () => {
	const { app } = await mainPromise;
	application = app;
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app).post('/users/register').send({
			email: 'user3@www.com',
			name: 'User3',
			password: 'user3secret',
		});
		expect(res.statusCode).toBe(422);
	});
	it('Login - success', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'user3@www.com',
			password: 'user3secret',
		});
		expect(res.body.jwt).not.toBeUndefined();
	});
	it('Login - error', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'user3@www.com',
			password: 'usersecret',
		});
		expect(res.statusCode).toBe(401);
	});
	it('Login - empty email', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: '',
			password: 'usersecret',
		});
		expect(res.statusCode).toBe(422);
	});
	it('Info - success', async () => {
		const login = await request(application.app).post('/users/login').send({
			email: 'user3@www.com',
			password: 'user3secret',
		});
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(res.body.email).toBe('user3@www.com');
	});
	it('Info - error', async () => {
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer hghghgfhgf`);
		expect(res.statusCode).toBe(401);
	});
});

afterAll(async () => {
	application.close();
});
