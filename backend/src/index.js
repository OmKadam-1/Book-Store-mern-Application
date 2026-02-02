const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors=require("cors");
const { createAnAdminAccount } = require("./utils/common");
const authRoute = require('./routes/auth/authRoute');
const adminBookRoute = require('./routes/admin/bookRoute');
const customerBookRoute = require('./routes/customer/bookRoute');
const customerCartRoute = require('./routes/customer/cartRoute');
const customerOrderRoute = require('./routes/customer/orderRoute');
const adminOrderRoute = require('./routes/admin/orderRoute');








const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;
const corsorigin = process.env.CORS_ORIGIN;
const corsOptions = {
  origin: corsorigin,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));



// MongoDB Connection
mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log("Connected to MongoDB...");
    createAnAdminAccount();
  })
  .catch((error) =>
    console.error(`MongoDB connection error: ${error}`)
  );

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use('/api/auth', authRoute);
// Admin Routes
app.use('/api/admin/book', adminBookRoute);
app.use('/api/admin/order', adminOrderRoute);

app.use('/api/customer/book', customerBookRoute);
app.use('/api/customer/cart', customerCartRoute);
app.use('/api/customer/order', customerOrderRoute);




