const { findOneUserRepository } = require('../repository/user.repository');

const isUserExists = async (filter) => {
  const user = await findOneUserRepository(filter);
  return !!user;
};

module.exports = isUserExists;
