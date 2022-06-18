const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateUserAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/me', getUserInfo);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
