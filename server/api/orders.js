const router = require('express').Router();
const db = require('../db');
const {
  User,
  Address,
  Order,
  OrderItem,
  Donut,
  CartItem,
} = require('../db/models');
const { isLoggedIn } = require('../utils');
const stripe = require('stripe')(process.env.STRIPE_KEY);
module.exports = router;

const adjustStock = async (id, qty) => {
  const donut = await Donut.findByPk(id);
  // if (donut.qty < qty) {
  //   //throw new Error();
  // }
  donut.qty -= qty;
  await donut.save();
};

router.put('/', isLoggedIn, async (req, res, next) => {
  try {
    const result = await db.transaction(async t => {
      // transaction start

      const [address] = await Address.findOrCreate({
        where: { address1: req.body.address1, address2: req.body.address2 },
        defaults: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address2: req.body.address2,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
        },
      });

      const user = await User.findByPk(req.user.id);

      if (!user.addressId) {
        await user.setAddress(address);
      }

      const cartItems = await user.getCartItems({
        include: [
          {
            model: Donut,
            attributes: ['name', 'imageUrl', 'qty', 'price'],
          },
        ],
      });

      const total = cartItems.reduce((acc, item) => {
        return acc + item.donut.price * item.qty * 100;
      }, 0);

      const charge = await stripe.charges.create({
        amount: total,
        currency: 'usd',
        description: 'Hole Foods',
        source: req.body.token.id,
      });

      console.log('CHARGE', charge);

      const order = await Order.create();
      await order.setUser(user);
      await order.setAddress(address);
      await user.setAddress(address);

      const orderItems = await Promise.all(
        cartItems.map(async item => {
          await adjustStock(item.donutId, item.qty); // substract from donut stock
          return OrderItem.create({
            price: item.donut.price,
            qty: item.qty,
            donutId: item.donutId,
          });
        })
      );

      await order.setOrderItems(orderItems); // take in an array of order items

      order.receiptUrl = charge.receipt_url;
      order.chargeId = charge.id;
      await order.save();

      await CartItem.destroy({ where: { userId: user.id } }); // finally destroy cart items

      const items = await order.getOrderItems({
        include: [
          {
            model: Donut,
            attributes: ['name', 'imageUrl', 'qty', 'price'],
          },
        ],
      });

      return { order, items, address };
    });
    // transaction commits here
    res.json(result);
  } catch (err) {
    next(err);
  }
});
