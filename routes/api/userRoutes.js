const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  getFriends,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends').get(getFriends);

// /api/users/:userId/friends/:userId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
