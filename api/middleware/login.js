const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../constants/http-exception.constant');
require('dotenv').config();

module.exports = (req, res, next) => {
  const { code, message } = UNAUTHORIZED;
  const { authorization } = req.headers;
  if (!authorization) res.status(code).send({ message });

  try {
    const token = authorization.split(' ')[1];
    const decode = jwt.verify(token, `${process.env.JWT_KEY}`);
    req.user = decode;
    next();
  } catch (error) {
    res.status(code).send({ message });
  }
};
