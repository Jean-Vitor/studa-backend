const { register } = require('../api/controller/user.controller');

describe('Unit tests', () => {
  it('verify if create user is working', () => {
    register({ name: 'Jean Vitor', email: 'jean.vitor@outlook.com.br', password: 'Doidera123' });
  });
});
