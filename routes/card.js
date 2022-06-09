const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLikeOnCard,
  removeLikeOnCard,
} = require('../controllers/card');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', addLikeOnCard);
router.delete('/cards/:cardId/likes', removeLikeOnCard);

module.exports = router;
