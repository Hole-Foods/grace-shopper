'use strict';
const chance = require('chance')(123);
const db = require('../server/db');
const {
  User,
  Review,
  Donut,
  Category,
  CartItem,
} = require('../server/db/models');

const NUM_USERS = 5;
const NUM_CATEGORIES = 5;
const NUM_DONUTS = 10;
const NUM_QTY = 10;
const NUM_REVIEWS = 10;
const NUM_CART_ITEMS = 5; // FOR USER EMAIL@EMAIL.COM

const emails = chance.unique(chance.email, NUM_USERS);

const doTimes = (num, func) => {
  const arr = [];
  while (num--) {
    arr.push(func());
  }
  return arr;
};

const randomName = () => {
  const numWords = chance.natural({
    min: 1,
    max: 3,
  });
  return chance
    .sentence({ words: numWords })
    .replace(/\b\w/g, function(m) {
      return m.toUpperCase();
    })
    .slice(0, -1);
};

const randomUser = () => {
  return User.build({
    email: emails.pop(),
    password: chance.word(),
  });
};

const randomCategory = () => {
  return Category.build({
    name: randomName(),
  });
};

const randomDonut = () => {
  return Donut.build({
    name: randomName(),
    description: chance.paragraph({ sentences: 10 }),
    price: chance.floating({ min: 0, max: 100, fixed: 2 }),
    qty: `${NUM_QTY}`,
    categoryId: chance.integer({ min: 1, max: `${NUM_CATEGORIES}` }),
  });
};

const randomReview = () => {
  return Review.build({
    name: randomName(),
    content: chance.paragraph({ sentences: 10 }),
    rating: chance.integer({ min: 1, max: 5 }),
    userId: chance.integer({ min: 1, max: `${NUM_USERS}` }),
    donutId: chance.integer({ min: 1, max: `${NUM_DONUTS}` }),
  });
};

const randomCartItem = () => {
  return CartItem.build({
    qty: chance.integer({ min: 1, max: 5 }),
    userId: 1,
    donutId: chance.integer({ min: 1, max: `${NUM_DONUTS}` }),
  });
};

const users = doTimes(NUM_USERS, randomUser);
const categories = doTimes(NUM_CATEGORIES, randomCategory);
const donuts = doTimes(NUM_DONUTS, randomDonut);
const reviews = doTimes(NUM_REVIEWS, randomReview);
const cartItems = doTimes(NUM_CART_ITEMS, randomCartItem);

const seed = async () => {
  try {
    await db.sync({ force: true });

    await User.create({
      email: 'email@email.com',
      password: '123',
      isAdmin: true,
    });

    await Promise.all(users.map(user => user.save()));
    console.log(`${users.length} users seeded!`);
    await Promise.all(categories.map(category => category.save()));
    console.log(`${categories.length} categories seeded!`);
    await Promise.all(donuts.map(donut => donut.save()));
    console.log(`${donuts.length} donuts seeded!`);
    await Promise.all(reviews.map(review => review.save()));
    console.log(`${reviews.length} reviews seeded!`);
    await Promise.all(cartItems.map(item => item.save()));
    console.log(`${cartItems.length} cart items for email@email.com seeded!`);
    console.log(`everything seeded successfully!`);
  } catch (err) {
    console.log(err);
  }
};

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
