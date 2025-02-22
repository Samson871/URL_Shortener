const mongoose = require('mongoose');

const connectmongoDb = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);  // More detailed error logging
    process.exit(1);  // Exit the process on connection failure
  }
};

module.exports = {
  connectmongoDb,
};