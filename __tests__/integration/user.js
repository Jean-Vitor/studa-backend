const request = require('supertest');
const server = require('../../server');
const database = require('../../api/config/db.config');
const truncate = require('../../api/config/truncate');

describe('User Endpoints', () => {
  afterAll(async () => {
    await truncate(database.models);
    await database.close();
  });

  test('should create a new user', async () => {
    const user = await request(server)
      .post('/api/register')
      .send({
        name: 'Jean Vitor',
        email: 'aa.aa@email.com',
        password: 'Password123',
      });

    expect(user.statusCode)
      .toBe(201);
  });

  test('should create a new user and check login', async () => {
    const responseRegister = await request(server)
      .post('/api/register')
      .send({
        name: 'Teste',
        email: 'teste@email.com',
        password: 'Password123',
      });

    const responseLogin = await request(server)
      .post('/api/login')
      .send({
        email: 'teste@email.com',
        password: 'Password123',
      });

    expect(responseRegister.statusCode)
      .toBe(201);

    expect(responseLogin.statusCode)
      .toBe(200);
  });

  test('should create a new user and check login and check if token exists', async () => {
    const responseRegister = await request(server)
      .post('/api/register')
      .send({
        name: 'Teste',
        email: 'teste2@email.com',
        password: 'Password123',
      });

    const responseLogin = await request(server)
      .post('/api/login')
      .send({
        email: 'teste2@email.com',
        password: 'Password123',
      });

    expect(responseRegister.statusCode)
      .toBe(201);

    expect(responseLogin.statusCode)
      .toBe(200);

    expect(responseLogin.body.token).toBeTruthy();
  });
});
