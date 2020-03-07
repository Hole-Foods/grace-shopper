const router = require('express').Router();
const { User, Donut, CartItem } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await CartItem.findAll({
        where: { userId: req.user.id },
        include: [Donut],
      });
      res.json(userCart);
    } else {
      if (!req.session.cart) {
        req.session.cart = [];
      }
      const guestCart = req.session.cart;
      await Promise.all(
        guestCart.map(async item => {
          item.donut = await Donut.findByPk(item.donutId);
        })
      );
      res.json(guestCart);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cartItemArr = await CartItem.findOrCreate({
        where: { userId: req.user.id, donutId: req.body.donutId },
      });
      const cartItem = cartItemArr[0];
      const newQty = req.body.qty + cartItem.qty;
      await cartItem.update({ qty: newQty });
      const withDonut = await CartItem.findByPk(cartItem.id, {
        include: Donut,
      });
      res.json(withDonut);
    } else {
      if (!req.session.cart) {
        req.session.cart = [];
      }
      let update = false;
      const updatedCart = req.session.cart.map(el => {
        if (el.donutId === req.body.donutId) {
          el.qty += req.body.qty;
          update = true;
        }
        return el;
      });
      const donut = await Donut.findByPk(req.body.donutId);
      const addDonut = { ...req.body, donut };
      if (update === false) {
        updatedCart.push(addDonut);
      }
      req.session.cart = updatedCart;
      res.json(addDonut);
    }
  } catch (err) {
    next(err);
  }
});
