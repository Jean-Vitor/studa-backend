const passwordDoesNotMatch = require('../../api/utils/passwordDoesNotMatch');

describe('Test password validation', () => {
  it('incorrect password validation: password without capital letter', () => {
    const isPasswordDoesNotMatch = passwordDoesNotMatch('password123');
    expect(isPasswordDoesNotMatch).toBe(true);
  });

  it('incorrect password validation: password without a numeric digit', () => {
    const isPasswordDoesNotMatch = passwordDoesNotMatch('Password');
    expect(isPasswordDoesNotMatch).toBe(true);
  });

  it('incorrect password validation: password less than 8 characters', () => {
    const isPasswordDoesNotMatch = passwordDoesNotMatch('Pass12');
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
