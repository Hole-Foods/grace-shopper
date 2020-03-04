const router = require('express').Router();
const { User, Review, Donut, CartItem } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
      include: [Review, CartItem], // FOR TESTING!
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.userId, {
      attributes: ['id', 'email'],
      include: [Review], //future add past orders here
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const userCart = await CartItem.findAll({
      where: { userId: req.params.userId },
      include: [Donut],
    });
    res.json(userCart);
  } catch (err) {
    next(err);
  }
});
