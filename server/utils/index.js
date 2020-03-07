const isLoggedIn = (req, res, next) => {
  if (!req.user || !req.user.id) {
    const err = new Error(`You are not logged in!`);
    err.status = 401;
    return next(err);
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error(`You do not have sufficient privledges!`);
    err.status = 401;
    return next(err);
  }
  next();
};

module.exports = { isLoggedIn, isAdmin };
