const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getAllThoughts)

// /api/thoughts/:userId
router.route('/:userId').post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions/:userId
router.route('/:thoughtId/reactions/:userId')
  .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
