const { Router } = require('express');
const taskRoutes = require('./task.routes');
const userRoutes = require('./user.routes');
const eventRoutes = require('./event.routes');

const router = Router();

router.use('/', taskRoutes);
router.use('/', userRoutes);
router.use('/', eventRoutes);

module.exports = router;
