const mongoose = require("mongoose");
require("dotenv").config();

// connect db method
const connectDB = async () => {
  try {
    // passing mongo uri
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 0,
    });

    // if connected, able to see console
    console.log("Connected to MongoDB");
  } catch (error) {
    // else error
    console.error("Error connecting to MongoDB:", error);
  }
};

// calling this function
connectDB();

module.exports = {
  connectDB,
};
