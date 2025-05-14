// controllers/authController.js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail'); 

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or Username already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user._id, username, email } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Find user by email OR username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};


exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });
  
      const resetURL = `${process.env.RESETURL}/${resetToken}`;
      const message = `You requested a password reset. Submit your new password at: ${resetURL}`;
  
      await sendEmail({
        to: user.email,
        subject: 'Password Reset',
        text: message
      });
  
      res.status(200).json({ message: 'Reset token sent to email' });
    } catch (err) {
      next(err);
    }
  };

  exports.resetPassword = async (req, res, next) => {
    const { password } = req.body;
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  
    try {
      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) return res.status(400).json({ message: 'Token is invalid or has expired' });
  
      user.password = await bcrypt.hash(password, 12);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
  
      res.status(200).json({ message: 'Password reset successful', token });
    } catch (err) {
      next(err);
    }
  };
