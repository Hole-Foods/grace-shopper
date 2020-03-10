const router = require('express').Router();
const {
  User,
  Review,
  Donut,
  CartItem,
  Address,
  Order,
  OrderItem,
} = require('../db/models');
module.exports = router;
const { isAdmin } = require('../utils');

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'isAdmin'],
      include: [Address, Order],
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

router.delete('/:userId', isAdmin, async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.userId } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put('/:userId', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.update(req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
