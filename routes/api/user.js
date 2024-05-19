const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  putUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(putUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend)

module.exports = router;
 