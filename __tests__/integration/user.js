const request = require('supertest');
const server = require('../../start');
const database = require('../../api/config/db.config');

describe('User Endpoints', () => {
  afterAll(() => {
    database.close();
  });

  it('should create a new user', async () => {
    const user = await request(server)
      .post('/api/register')
      .send({
        name: 'Jean Vitor',
        email: 'test.test@email.com',
        password: 'Password123',
      });

    console.log(user);

    expect(user.statusCode).toBe(201);
  });
});
