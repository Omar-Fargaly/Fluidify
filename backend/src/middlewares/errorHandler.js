// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message, errors: err.errors });
    }
  
    if (err.code === 11000) {
      return res.status(400).json({
        message: 'Duplicate field value entered',
        details: err.keyValue,
      });
    }
    res.status(err.status || 500).json({
      message: err.message || 'Something went wrong! Please try again later.',
    });
  };
  
  module.exports = errorHandler;
  