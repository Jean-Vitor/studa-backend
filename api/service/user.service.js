const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const httpException = require('../exception/http-exception');
const { INVALID_EMAIL, INVALID_PASSWORD, INVALID_USER } = require('../constants/exception-validation.constant');
const { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } = require('../constants/http-exception.constant');
const {
  registerRepository,
  removeUserRepository,
  updateUserRepository,
  findUserByPkRepository,
  findOneUserRepository,
} = require('../repository/user.repository');
const isEmptyBody = require('../utils/isEmptyBody');
const isUserExists = require('../utils/isUserExists');
const passwordDoesNotMatch = require('../utils/passwordDoesNotMatch');

exports.registerService = async (body) => {
  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);

  const {
    email,
    password,
    name,
  } = body;

  if (passwordDoesNotMatch(password)) {
    throw httpException(INVALID_PASSWORD);
  }

  if (await isUserExists({ where: { email } })) throw httpException(INVALID_EMAIL);

  try {
    const hash = await bcrypt.hash(password, 10);
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

  console.log(email, password);

  console.log(!await isUserExists({ where: { email } }));

  if (!await isUserExists({ where: { email } })) throw httpException(INVALID_USER);

  const { dataValues } = await findOneUserRepository({ where: { email } });

  const isPasswordCorrectly = await bcrypt.compare(password, dataValues.password);

  if (!isPasswordCorrectly) throw httpException(UNAUTHORIZED);

  const getJWT = () => (
    jwt.sign({
      id: dataValues.id,
      email: dataValues.email,
      name: dataValues.name,
    },
    `${process.env.JWT_KEY}`,
    {
      expiresIn: '24h',
    })
  )


  return {
    token: getJWT(),
    user: {name: dataValues.name, email: dataValues.email}
  }
  
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

  if (passwordDoesNotMatch(newPassword)) {
    throw httpException(INVALID_PASSWORD);
  }

  const user = await findUserByPkRepository(id);
  if (!user) throw httpException(UNAUTHORIZED);

  const isPasswordCorrectly = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordCorrectly) throw httpException(UNAUTHORIZED);

  const hash = await bcrypt.hash(newPassword, 10);

  const [responseID] = await updateUserRepository(id, { password: hash });
  if (!responseID) throw httpException(NOT_FOUND);
};
