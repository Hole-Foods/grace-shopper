'use strict'
const Op = require('sequelize')
const db = require('../server/db')
const {
  User,
  Review,
  Donut,
  Category,
  CartItem,
  Order
} = require('../server/db/models')
const {users, donuts, reviews, cItems} = require('./data')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // USERS
  const seedUsers = await Promise.all(users.map(usr => User.create(usr)))
  console.log(`${seedUsers.length} users seeded!`)

  // CATEGORIES
  await Category.create({name: 'ring'})
  console.log(`ring category created!`)
  await Category.create({name: 'hole'})
  console.log(`hole category created!`)
  await Category.create({name: 'bar'})
  console.log(`bar category created!`)

  // DONUTS
  const seedDonuts = await Promise.all(
    donuts.map(async donut => {
      const newDonut = await Donut.create(donut)
      const category = await Category.findOne({
        where: {id: donut.categoryId}
      })
      await category.addDonut(newDonut)
    })
  )
  console.log(`${seedDonuts.length} donuts seeded!`)

  // REVIEWS
  const seedReviews = await Promise.all(
    reviews.map(async review => {
      const newReview = await Review.create(review)
      const donut = await Donut.findOne({
        where: {id: review.donutId}
      })
      // await newReview.setReview(donut)
      await donut.addReview(newReview)
    })
  )
  console.log(`${seedReviews.length} reviews seeded!`)

  // CART
  const seedCart = await Promise.all(cItems.map(item => CartItem.create(item)))
  console.log(`${seedCart.length} items seeded!`)

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
