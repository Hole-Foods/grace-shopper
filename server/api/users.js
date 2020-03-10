const router = require('express').Router();
const {
  User,
  Review,
  Donut,
  CartItem,
  Order,
  OrderItem,
  Address,
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
      include: [
        {
          model: Order,
          include: [Review, { model: OrderItem, include: [{ model: Donut }] }],
        },
        {
          model: Review,
        },
        {
          model: Address,
        },
      ],
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
