const router = require('express').Router();
const db = require('../db');
const { User, Address } = require('../db/models');
const { isLoggedIn } = require('../utils');
module.exports = router;

router.put(`/`, isLoggedIn, async (req, res, next) => {
  try {
    const updatedAddress = await Address.update(req.body, {
      where: { id: req.user.addressId },
    });
    res.json(updatedAddress);
  } catch (err) {
    next(err);
  }
});
