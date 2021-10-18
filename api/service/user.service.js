const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const httpException = require('../exception/http-exception');
const { BAD_REQUEST, UNAUTHORIZED } = require('../constants/http-exception.constant');
const { registerRepository, findOneRepository } = require('../repository/user.repository');
const isEmptyBody = require('../utils/isEmptyBody');

exports.registerService = async (body) => {
  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);

  const {
    email,
    password,
    name,
  } = body;

  const regex = '^(?=.*d)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}$';
  if (!password.match(regex)) throw httpException({ code: 400, message: 'Validation error: password is not valid' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await findOneRepository({ where: { email } });
    if (user) throw httpException({ code: 409, message: 'Validation error: email already exist' });

    const newUser = {
      email,
      password: hash,
      name,
    };
    return registerRepository(newUser);
  } catch (error) {
    console.error(error);
    throw httpException(error);
  }
};

exports.loginService = async (body) => {
  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);

  const {
    email,
    password,
  } = body;

  const user = await findOneRepository({ where: { email } });
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
    expiresIn: '1d',
  });

  return token;
};
