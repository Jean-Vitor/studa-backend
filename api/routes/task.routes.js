const { Router } = require('express');
const {
  createTask,
  completeTask,
  findAllTasks,
  findAllCompletedTasks,
  findOneTask,
  updateTask,
  removeTask,
} = require('../controller/task.controller');

const auth = require('../middleware/auth');

const router = Router();

router.post('/task', auth, createTask);

router.get('/task', auth, findAllTasks);

router.get('/task/completed', auth, findAllCompletedTasks);

router.get('/task/:id', auth, findOneTask);

router.post('/task/completed/:id', auth, completeTask);

router.put('/task/:id', auth, updateTask);

router.delete('/task/:id', auth, removeTask);

module.exports = router;
