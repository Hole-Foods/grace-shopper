const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.INT,
    validate: {
      min: 1,
      max: 5
    },
    allowNull: false
  }
})

module.exports = Review
