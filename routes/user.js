const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateUserAvatar,
} = require('../controllers/user');
const {
  updateUserValidation,
  updateUserAvatarValidation,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/me', getUserInfo);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);

module.exports = router;
