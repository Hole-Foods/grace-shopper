//TEMPORARY STRIPE STUFF
const keyPublishable = 'pk_test_DzVlyfjoZiS6pdStgCpDJIc200YU6L9vVh';
const keySecret = 'sk_test_YJA58vGP4GkjzwluIAU3AFh900gsgtGyDq';

const router = require('express').Router();
const stripe = require('stripe')(keySecret);
module.exports = router;

// to open the payment page on base url
router.get('/', (req, res, next) => {
  res.render('index', { keyPublishable: keyPublishable });
});

router.post('/pay', (req, res, next) => {
  let amount = 10 * 100;

  // create a customer
  stripe.customers
    .create({
      email: req.body.stripeEmail, // customer email
      source: req.body.stripeToken, // token for the card
    })
    .then(customer =>
      stripe.charges.create({
        // charge the customer
        amount,
        description: 'Sample Charge',
        currency: 'usd',
        customer: customer.id,
      })
    )
    .then(charge => res.render('pay')) // render the payment successful alter page after payment
    .catch(err => next(err));
});
