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
      include: [
        {
          model: Order,
          include: [{ model: OrderItem, include: [{ model: Donut }] }],
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
