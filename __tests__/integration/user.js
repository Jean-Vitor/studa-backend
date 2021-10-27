const request = require('supertest');
const server = require('../../start');
const database = require('../../api/config/db.config');
const User = require('../../api/model/User');

describe('User Endpoints', () => {
  afterAll(async () => {
    await User.sync({ force: true });
    await database.close();
  });

  it('should create a new user', async () => {
    const user = await request(server)
      .post('/api/register')
      .send({
        name: 'Jean Vitor',
        email: 'test.test@email.com',
        password: 'Password123',
      });

    expect(user.statusCode)
      .toBe(201);
  });
});
