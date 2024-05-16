const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  deleteThought,
  putThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(putThought).delete(deleteThought);

router.route('/:thoughtsId').post(createReaction).delete(deleteReaction)


module.exports = router;
