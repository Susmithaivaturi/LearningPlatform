// controllers/authController.js
const User = require('../models/User');

// Registration controller
const registerUser = async (req, res) => {
  const {name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Already exists please login' });
  }

  try {
    // Create a new user
    const user = new User({ name, email, password });

    // Save the user to the database
    await user.save();
    req.session.user = user;
    // Respond with success message
    res.redirect('/dashboard')
  } catch (err) {
    // Handle error if any
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If login is successful, create a session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
  };

    // Respond with success message
    res.redirect('/dashboard')
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Logout controller
const logoutUser = (req, res) => {
  // Destroy the session to log out
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.redirect('/login')
  });
};

module.exports = { registerUser, loginUser, logoutUser };
