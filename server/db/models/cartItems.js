const Sequelize = require('sequelize');
const db = require('../db');

const CartItem = db.define('cartItem', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = CartItem;
