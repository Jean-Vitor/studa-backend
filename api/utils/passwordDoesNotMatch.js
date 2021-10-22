const passwordDoesNotMatch = (password) => {
  const regex = '(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}$';
  return !!(password.includes(' ') || !password.match(regex));
};

module.exports = passwordDoesNotMatch;
