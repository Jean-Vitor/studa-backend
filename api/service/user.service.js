const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const httpException = require('../exception/http-exception');
const { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } = require('../constants/http-exception.constant');
const {
  registerRepository,
  findOneUserRepository,
  removeUserRepository,
  updateUserRepository,
  findUserByPkRepository,
} = require('../repository/user.repository');
const isEmptyBody = require('../utils/isEmptyBody');

exports.registerService = async (body) => {
  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);

  const {
    email,
    password,
    name,
  } = body;

  const regex = '(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}$';
  if (password.includes(' ') || !password.match(regex)) {
    throw httpException({ code: 400, message: 'Validation error: password is not valid' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await findOneUserRepository({ where: { email } });
    if (user) throw httpException({ code: 409, message: 'Validation error: email already exist' });

    const newUser = {
      email,
      password: hash,
      name,
    };
    return registerRepository(newUser);
  } catch (error) {
    throw httpException(error);
  }
};

exports.loginService = async (body) => {
  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);

  const {
    email,
    password,
  } = body;

  const user = await findOneUserRepository({ where: { email } });
  if (!user) throw httpException(UNAUTHORIZED);

  const isPasswordCorrectly = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrectly) throw httpException(UNAUTHORIZED);

  const token = jwt.sign({
    id: user.id,
    email: user.email,
    name: user.name,
  },
  `${process.env.JWT_KEY}`,
  {
    expiresIn: '24h',
  });

  return token;
};

exports.removeUserService = async (id) => {
  const responseID = await removeUserRepository(id);
  if (!responseID) throw httpException(NOT_FOUND);
};

exports.updateUserService = async (id, body) => {
  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);
  const { email, name } = body;

  const [responseID] = await updateUserRepository(id, { email, name });
  if (!responseID) throw httpException(NOT_FOUND);
};

exports.updatePasswordUserService = async (id, body) => {
  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);
  const { currentPassword, newPassword } = body;

  const regex = '(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}$';
  if (newPassword.includes(' ') || !newPassword.match(regex)) {
    throw httpException({ code: 400, message: 'Validation error: password is not valid' });
  }

  const user = await findUserByPkRepository(id);
  if (!user) throw httpException(UNAUTHORIZED);

  const isPasswordCorrectly = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordCorrectly) throw httpException(UNAUTHORIZED);

  const hash = await bcrypt.hash(newPassword, 10);

  const [responseID] = await updateUserRepository(id, { password: hash });
  if (!responseID) throw httpException(NOT_FOUND);
};
