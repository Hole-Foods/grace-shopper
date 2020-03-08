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
      const cart = req.session.cart;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].donutId === req.body.donutId) {
          cart[i].qty += req.body.qty;
          update = true;
        }
      }
      if (update === false) {
        const donut = await Donut.findByPk(req.body.donutId);
        const addDonut = { ...req.body, donut };
        cart.push(addDonut);
      }
      req.session.cart = cart;
      const inArr = cart.find(e => e.donutId === req.body.donutId);
      res.json(inArr);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:donutId', async (req, res, next) => {
  try {
    if (req.user) {
      const toDelete = await CartItem.findOne({
        where: { userId: req.user.id, donutId: req.params.donutId },
      });
      await toDelete.destroy();
    } else {
      const guestCart = req.session.cart;
      const updatedCart = guestCart.filter(
        item => item.donutId != req.params.donutId
      );
      console.log(updatedCart);
      req.session.cart = updatedCart;
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
