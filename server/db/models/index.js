const User = require('./user');
const Review = require('./review');
const Donut = require('./donut');
const Order = require('./order');
const Category = require('./category');
const OrderItem = require('./orderItems');
const CartItem = require('./cartItems');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Donut);
Donut.hasMany(Review);

Order.belongsTo(User);
User.hasMany(Order);

Donut.belongsTo(Category);
Category.hasMany(Donut);

CartItem.belongsTo(Donut);
Donut.hasMany(CartItem);

CartItem.belongsTo(User);
User.hasMany(CartItem);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

OrderItem.belongsTo(Donut);
Donut.hasMany(OrderItem);

User.hasMany(Order);
Order.belongsTo(User);

// Donut.belongsToMany(User, {through: CartItem})
// User.belongsToMany(Donut, {through: CartItem})

// Donut.belongsToMany(Order, {through: OrderItem})
// Order.belongsToMany(Donut, {through: OrderItem})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Review,
  Donut,
  Order,
  Category,
  CartItem,
  OrderItem,
};
