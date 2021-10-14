const { Router } = require('express');
const {
  create, findAll, findAllCompleted, findOne, update, remove,
} = require('../controller/task.controller');

const auth = require('../middleware/auth');

const router = Router();

// Create a new Task
router.post('/task', auth, create);

// Retrieve all Task
router.get('/task', auth, findAll);

// Retrieve a single Task with id
router.get('/task/:id', auth, findOne);

// Retrieve a single Task with id
router.get('/task/completed', auth, findAllCompleted);

// Update a Task with id
router.put('/task/:id', auth, update);

// Delete a Task with id
router.delete('/task/:id', auth, remove);

module.exports = router;
