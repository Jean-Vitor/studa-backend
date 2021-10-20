const { Router } = require('express');
const {
  register, login, removeUser, updateUser,
} = require('../controller/user.controller');
const auth = require('../middleware/auth');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/user', auth, updateUser);
router.delete('/user', auth, removeUser);

module.exports = router;
