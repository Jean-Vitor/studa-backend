const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../constants/http-exception.constant');
require('dotenv').config();

const getDecodedUser = (authorization) => {
  const token = authorization.split(' ')[1];
  return jwt.verify(token, `${process.env.JWT_KEY}`);
};

const authUser = (req, res, next) => {
  const { code, message } = UNAUTHORIZED;
  const { authorization } = req.headers;
  if (!authorization) res.status(code).send({ message });

  try {
    const decodedUser = getDecodedUser(authorization);
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(code).send({ message });
  }
};

module.exports = authUser;
