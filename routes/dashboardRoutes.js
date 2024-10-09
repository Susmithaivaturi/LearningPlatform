const express = require('express');
const path = require('path'); 
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
};

router.get('/dashboard', isAuthenticated, (req, res) => {
  const { name, email } = req.session.user;
  res.redirect(`/dashboard.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
});


module.exports = router;
