const { Router } = require('express');
const TaskRoutes = require('./task.routes');
const UserRoutes = require('./user.routes');

const router = Router();

router.use('/', TaskRoutes);
router.use('/', UserRoutes);

module.exports = router;
