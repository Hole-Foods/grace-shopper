const router = require('express').Router();
const User = require('../db/models/user');
const CartItem = require('../db/models/cartItems');
module.exports = router;

const mergeCarts = async (cart, user) => {
  let item;
  for (let i = 0; i < cart.length; i++) {
    item = cart[i];
    const cartItemArr = await CartItem.findOrCreate({
      where: { userId: user.id, donutId: item.donutId },
    });
    const cartItem = cartItemArr[0];
    const newQty = item.qty + cartItem.qty;
    await cartItem.update({ qty: newQty });
  }
};

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong username and/or password');
    } else {
      if (req.session.cart) {
        await mergeCarts(req.session.cart, user);
        req.session.cart = [];
      }
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    if (req.session.cart) {
      await mergeCarts(req.session.cart, user);
      req.session.cart = [];
    }
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
