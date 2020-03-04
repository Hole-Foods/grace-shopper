const users = [
  {
    firstName: 'Anna',
    lastName: 'Anna',
    email: 'anna@email.com',
    password: 'password',
  },
  {
    firstName: 'Drew',
    lastName: 'Werd',
    email: 'drew@email.com',
    password: 'password',
  },
  {
    firstName: 'Josh',
    lastName: 'Hsoh',
    email: 'josh@email.com',
    password: 'password',
  },
  {
    firstName: 'Brian',
    lastName: 'Nairb',
    email: 'brian@email.com',
    password: 'password',
  },
];

const reviews = [
  {
    rating: 1,
    content: `Worst bagel ever!!! Way too sweet!! WHO PUTS sugar ON A BAGEL???? I did enjoy the fact that the bagel came preloaded with jelly but I believe the store’s advertising is dishonest as this bagel did not have a hole!! Avoid!!!`,
    donutId: 1,
    userId: 1,
  },
  {
    rating: 5,
    content: `These donuts are like crack! I ordered the banana nutella. After I finished, I felt this intense rush of blood to my head, my heart was pounding, and it was like I was on top of the world. The high wore off after an hour or so and, quite honestly, I felt absolutely terrible. But when I called customer service, they assured me they had a large stock and there was no need to panic. I ordered several boxes and plan to sell them to my friends.`,
    donutId: 1,
    userId: 1,
  },
  {
    rating: 4,
    content: `I ordered a dozen of the artisanal glazed chocolate donut holes. I was generally pleased.`,
    donutId: 2,
    userId: 2,
  },
];

const categories = [
  { name: 'ring' },
  { name: 'hole' },
  { name: 'filled' },
  { name: 'old fashioned' },
  { name: 'bar' },
  { name: 'long john' },
  { name: 'beignet' },
];

const donuts = [
  {
    name: 'Chocolate Frosted',
    categoryId: 1,
    price: 1.0,
    description: 'BabyMetal approved.',
    qty: 100,
    imageUrl:
      'https://previews.123rf.com/images/rainart123/rainart1231610/rainart123161000026/67577297-donut-illustration-vector.jpg',
  },
  {
    name: 'Pink Frosted',
    categoryId: 1,
    price: 2.0,
    description: 'Its just like the Chocolate donut, but it has more fun!',
    qty: 50,
    imageUrl:
      'https://i.pinimg.com/originals/9c/1d/4c/9c1d4c852bf8cb0ee75031e6bf6f0bb1.jpg',
  },
  {
    name: 'Glazed Donut Hole',
    categoryId: 2,
    price: 0,
    description:
      'Fill that hole in your heart - er, donut- with this tasty treat. Exploding with flavor with each moist, spherical bite. Also pairs perfectly with a medium roast coffee.',
    qty: 0,
    imageUrl:
      'https://cdn.clipart.email/7d800599376471c2a09a2c46b42045f4_donut-hole-clipart_450-428.jpeg',
  },
  {
    name: 'Snake Donut',
    categoryId: 1,
    price: 3.0,
    description: 'Do not let this one get away!',
    qty: 61,
    imageUrl:
      'https://preview.redd.it/5uzxdnns5pmz.jpg?width=1024&auto=webp&s=2678ac66064d4894734c987bf04e8174834e2ef6',
  },
  {
    name: 'Sugar of Saturn',
    categoryId: 1,
    price: 9.5,
    description: 'From up above.',
    qty: 2,
    imageUrl:
      'https://res.cloudinary.com/teepublic/image/private/s--Pk-aS3Rt--/t_Preview/b_rgb:5e366e,c_limit,f_jpg,h_630,q_90,w_630/v1526754965/production/designs/2704131_0.jpg',
  },
  {
    name: 'Cookie Monster',
    categoryId: 1,
    price: 3.5,
    description: 'D is for donut that is good enough for me',
    qty: 7,
    imageUrl:
      'https://previews.123rf.com/images/djvstock/djvstock1801/djvstock180113133/94572152-blue-donut-drawing-over-white-background-vector-illustration.jpg',
  },
  {
    name: `Dante's Donut`,
    categoryId: 1,
    price: 1.5,
    description: 'Represents the good in us all',
    qty: 2,
    imageUrl:
      'https://friendlystock.com/wp-content/uploads/2019/07/17-winged-angel-donut-emoji-cartoon-clipart.jpg',
  },
];

const cItems = [
  {
    userId: 1,
    donutId: 1,
    qty: 12,
  },
  {
    userId: 1,
    donutId: 2,
    qty: 22,
  },
  {
    userId: 3,
    donutId: 1,
    qty: 42,
  },
];

const orders = [];

module.exports = {
  users,
  reviews,
  categories,
  donuts,
  cItems,
  orders,
};
