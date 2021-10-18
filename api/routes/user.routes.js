const { Router } = require('express');
const {
  register, login, findOne, update, remove,
} = require('../controller/user.controller');

const router = Router();

router.post('/register', register);
router.post('/login', login);



// TODO atualizar e remover usuário;
// router.put("/user/:id", update);
// router.delete("/user/:id", remove);

module.exports = router;
