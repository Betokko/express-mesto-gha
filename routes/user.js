const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateUserAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.get('/users/me', getUserInfo);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
