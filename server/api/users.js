const router = require('express').Router();
const { User, Review, Donut, CartItem, Address } = require('../db/models');
module.exports = router;
const { isAdmin } = require('../utils');

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'isAdmin'],
      include: [Order, Address],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.userId, {
      attributes: ['id', 'email', 'isAdmin'],
      include: [Review], //future add past orders here
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
