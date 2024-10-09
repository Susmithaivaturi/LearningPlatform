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
  res.sendFile(path.join(__dirname, 'views','dashboard.html'));
});

module.exports = router;
