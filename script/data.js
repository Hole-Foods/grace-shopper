const users = [
  {
    firstName: 'Anna',
    lastName: 'Anna',
    email: 'anna@email.com',
    password: 'password'
  },
  {
    firstName: 'Drew',
    lastName: 'Werd',
    email: 'drew@email.com',
    password: 'password'
  },
  {
    firstName: 'Josh',
    lastName: 'Hsoh',
    email: 'josh@email.com',
    password: 'password'
  },
  {
    firstName: 'Brian',
    lastName: 'Nairb',
    email: 'brian@email.com',
    password: 'password'
  }
]

const reviews = [
  {
    rating: 1,
    content: `Worst bagel ever!!! Way too sweet!! WHO PUTS sugar ON A BAGEL???? I did enjoy the fact that the bagel came preloaded with jelly but I believe the store’s advertising is dishonest as this bagel did not have a hole!! Avoid!!!`,
    donutId: 1,
    userId: 1
  },
  {
    rating: 5,
    content: `These donuts are like crack! I ordered the banana nutella. After I finished, I felt this intense rush of blood to my head, my heart was pounding, and it was like I was on top of the world. The high wore off after an hour or so and, quite honestly, I felt absolutely terrible. But when I called customer service, they assured me they had a large stock and there was no need to panic. I ordered several boxes and plan to sell them to my friends.`,
    donutId: 1,
    userId: 1
  },
  {
    rating: 4,
    content: `I ordered a dozen of the artisanal glazed chocolate donut holes. I was generally pleased.`,
    donutId: 2,
    userId: 2
  }
]

const categories = [
  {name: 'ring'},
  {name: 'hole'},
  {name: 'filled'},
  {name: 'old fashioned'},
  {name: 'bar'},
  {name: 'long john'},
  {name: 'beignet'}
]

const donuts = [
  {
    name: 'Chocolate Frosted',
    categoryId: 1,
    price: 1.0,
    description: 'BabyMetal approved.',
    qty: 100,
    imageUrl:
      'https://previews.123rf.com/images/rainart123/rainart1231610/rainart123161000026/67577297-donut-illustration-vector.jpg'
  },
  {
    name: 'Pink Frosted',
    categoryId: 1,
    price: 2.0,
    description: 'Its just like the Chocolate donut, but it has more fun!',
    qty: 50,
    imageUrl:
      'https://i.pinimg.com/originals/9c/1d/4c/9c1d4c852bf8cb0ee75031e6bf6f0bb1.jpg'
  },
  {
    name: 'glazed donut hole',
    categoryId: 2,
    price: 0,
    description:
      'Fill that hole in your heart - er, donut- with this tasty treat. Exploding with flavor with each moist, spherical bite. Also pairs perfectly with a medium roast coffee.',
    qty: 0,
    imageUrl:
      'https://cdn.clipart.email/7d800599376471c2a09a2c46b42045f4_donut-hole-clipart_450-428.jpeg'
  }
]

const cItems = [
  {
    userId: 1,
    donutId: 1,
    qty: 12
  },
  {
    userId: 1,
    donutId: 2,
    qty: 22
  },
  {
    userId: 3,
    donutId: 1,
    qty: 42
  }
]

const orders = []

module.exports = {
  users,
  reviews,
  categories,
  donuts,
  cItems,
  orders
}
