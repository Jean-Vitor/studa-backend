const { Router } = require('express');
const {
  createEvent,
  findAllEvents,
  findAllCompletedEvents,
  findOneEvent,
  completeEvent,
  updateEvent,
  removeEvent,
} = require('../controller/event.controller');

const auth = require('../middleware/auth');

const router = Router();

router.post('/event', auth, createEvent);

router.get('/event', auth, findAllEvents);

router.get('/event/completed', auth, findAllCompletedEvents);

router.get('/event/:id', auth, findOneEvent);

router.post('/event/completed/:id', auth, completeEvent);

router.put('/event/:id', auth, updateEvent);

router.delete('/event/:id', auth, removeEvent);

module.exports = router;
