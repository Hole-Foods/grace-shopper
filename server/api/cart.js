const router = require('express').Router();
const { User, Donut, CartItem } = require('../db/models');
module.exports = router;

const guestCartItem = (donutId, qty) => {
  return {
    donutId,
    qty,
  };
};

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      console.log('REQ.USER !!!!!!!!!!!!!!!!! :', req.user);
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
          console.log('ITEM INSIDE MAP', item);
          item.donut = await Donut.findByPk(item.donutId);
        })
      );
      console.log(guestCart);
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
      cartItem.update({ qty: newQty });
      const withDonut = await CartItem.findByPk(cartItem.id, {
        include: Donut,
      });
      res.json(withDonut);
    } else {
      console.log('NOT LOGGED IN');
      // if (!req.session.cart) {
      //   req.session.cart = []
      // }
      // const guestCart = req.session.cart;
      // await Promise.all(guestCart.map(async item=> {
      //   item.donut = await Donut.findByPk(item.donutId)
      // }))
      // res.json(guestCart);
    }
  } catch (err) {
    next(err);
  }
});
