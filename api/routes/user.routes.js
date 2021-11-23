const { Router } = require('express');
const {
  register, login, removeUser, updateUser, updatePasswordUser, getUser
} = require('../controller/user.controller');
const auth = require('../middleware/auth');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/user', auth, updateUser);
router.get('/user', auth, getUser);
router.delete('/user', auth, removeUser);
router.put('/user/password', auth, updatePasswordUser);

module.exports = router;
