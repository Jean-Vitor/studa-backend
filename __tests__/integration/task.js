const request = require('supertest');
const database = require('../../api/config/db.config');
const server = require('../../server');
const truncate = require('../../api/config/truncate');

describe('Task Endpoints', () => {
  afterAll(async () => {
    await truncate(database.models);
    await database.close();
  });

  let token;

  beforeAll(async () => {
    await request(server)
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

    token = responseLogin.body.token;
  });

  test('test if you can create a new task', async () => {
    const responseNewTask = await request(server)
      .post('/api/task')
      .set('Authorization', `Baerer ${token}`)
      .send({
        title: 'Sei lá',
        description: 'Qualquer coisa',
        priority: 'HIGH',
        conclusionDate: '2021-10-30',
      });

    expect(responseNewTask.statusCode).toBe(201);
  });

  test('test whether you can create a task with a due date earlier than the current day', async () => {
    const responseNewTask = await request(server)
      .post('/api/task')
      .set('Authorization', `Baerer ${token}`)
      .send({
        title: 'Sei lá',
        description: 'Qualquer coisa',
        priority: 'HIGH',
        conclusionDate: '2021-10-27',
      });

    expect(responseNewTask.statusCode).toBe(500);
  });

  test('test if you can create a task with missing fields', async () => {
    const responseNewTask = await request(server)
      .post('/api/task')
      .set('Authorization', `Baerer ${token}`)
      .send({
        title: 'Sei lá',
        conclusionDate: '2021-10-27',
      });

    expect(responseNewTask.statusCode).toBe(500);
  });

  test('test if you can create a task with invalid fields (empty strings)', async () => {
    const responseNewTask = await request(server)
      .post('/api/task')
      .set('Authorization', `Baerer ${token}`)
      .send({
        title: '',
        description: '',
        priority: '',
        conclusionDate: '',
      });

    expect(responseNewTask.statusCode).toBe(500);
  });
});
