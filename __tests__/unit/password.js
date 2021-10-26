const passwordDoesNotMatch = require('../../api/utils/passwordDoesNotMatch');

describe('Should password does not match', () => {
  it('incorrect password validation: regex does not match', () => {
    const isPasswordDoesNotMatch = passwordDoesNotMatch('password123');

    expect(isPasswordDoesNotMatch).toBe(true);
  });

  it('incorrect password validation: password with space', () => {
    const isPasswordDoesNotMatch = passwordDoesNotMatch('password 123');

    expect(isPasswordDoesNotMatch).toBe(true);
  });

  it('correct password validation', () => {
    const isPasswordDoesNotMatch = passwordDoesNotMatch('Password123');

    expect(isPasswordDoesNotMatch).toBe(false);
  });
});
