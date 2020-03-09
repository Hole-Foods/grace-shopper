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
          country: req.body.country,
        },
      });

      const user = await User.findByPk(req.user.id);

      //console.log(Object.keys(user.__proto__));

      const cartItems = await user.getCartItems({
        include: [
          {
            model: Donut,
            attributes: ['name', 'imageUrl', 'qty', 'price'],
          },
        ],
      });
      // add check if there are cart items
      //console.log(Object.keys(order.__proto__));

      const order = await Order.create();
      await order.setUser(user);
      await order.setAddress(address);

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

      //await CartItem.destroy({ where: { userId: user.id } }); // finally destroy cart items

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
