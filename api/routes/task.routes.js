const { Router } = require('express');
const {
  create, findAll, findAllCompleted, findOne, update, remove,
} = require('../controller/task.controller');

const login = require('../middleware/login');

const router = Router();

// Create a new Task
router.post('/task', login, create);

// Retrieve all Task
router.get('/task', login, findAll);

// Retrieve a single Task with id
router.get('/task/:id', login, findOne);

// Retrieve a single Task with id
router.get('/task/completed', login, findAllCompleted);

// Update a Task with id
router.put('/task/:id', login, update);

// Delete a Task with id
router.delete('/task/:id', login, remove);

module.exports = router;
