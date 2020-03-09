const router = require('express').Router();
const { User, Address, Order, OrderItem, Donut } = require('../db/models');
const { isLoggedIn } = require('../utils');
module.exports = router;

const checkStock = cart => {
  return cart.filter(item => {
    return item.qty > item.donut.qty;
  });
};

const adjustStock = async (id, qty) => {
  const donut = await Donut.findByPk(id);
  donut.qty -= qty;
  await donut.save();
};

router.put('/', isLoggedIn, async (req, res, next) => {
  try {
    const [address, wasCreated] = await Address.findOrCreate({
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

    //cartItems[0].qty = 11111;
    // IMPORTANT: NEED TO ADD CHECK IF CART COMES BACK EMPTY

    const notInStock = checkStock(cartItems);

    if (notInStock.length) {
      res.send('NOT IN STOCK');
      //console.log('ITEMS NOT IN STOCK', notInStock); // RETURN ITEMS NOT IN STOCK FOR ERROR HANDLING
    }

    const order = await Order.create();
    await order.setUser(user);
    await order.setAddress(address);

    //console.log(Object.keys(order.__proto__));

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

    res.json({
      order,
      items,
      address,
    });
  } catch (err) {
    next(err);
  }
});
