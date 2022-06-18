const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLikeOnCard,
  removeLikeOnCard,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', addLikeOnCard);
router.delete('/:cardId/likes', removeLikeOnCard);

module.exports = router;
