const { Router } = require('express');
const {
  create, findAll, findAllCompleted, findOne, update, remove, completeTask,
} = require('../controller/task.controller');

const auth = require('../middleware/auth');

const router = Router();

router.post('/task', auth, create);

router.get('/task', auth, findAll);

router.get('/task/:id', auth, findOne);

router.get('/task/completed', auth, findAllCompleted);

router.post('/task/completed', auth, completeTask);

router.put('/task/:id', auth, update);

router.delete('/task/:id', auth, remove);

module.exports = router;
