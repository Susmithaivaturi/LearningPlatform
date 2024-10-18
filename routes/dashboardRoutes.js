const express = require('express');
const path = require('path'); 
const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
};

// Dashboard route
router.get('/dashboard', isAuthenticated, (req, res) => {
  const { name, email } = req.session.user;

  // Render the Pug template instead of redirecting to an HTML file
  res.render('dashboard', { name, email });
});

module.exports = router;
