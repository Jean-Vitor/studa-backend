const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../constants/http-exception.constant');
const { findOneRepository } = require('../repository/user.repository');
require('dotenv').config();

const getDecodedUser = (authorization) => {
  const token = authorization.split(' ')[1];
  return jwt.verify(token, `${process.env.JWT_KEY}`);
};

const authUser = async (req, res, next) => {
  const { code, message } = UNAUTHORIZED;
  const { authorization } = req.headers;
  if (!authorization) res.status(code).send({ message });

  try {
    const decodedUser = getDecodedUser(authorization);
    const isUserExists = await findOneRepository({
      where: {
        id: decodedUser.id,
      },
    });
    if (!isUserExists) res.status(code).send({ message });
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(code).send({ message });
  }
};

module.exports = authUser;
