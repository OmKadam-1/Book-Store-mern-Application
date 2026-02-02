const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const Order = require('../../models/Order')

const createUser = async (userData) => {
  try {
    const email = userData.email;
    const password = userData.password;
    const firstName = userData.firstName;
    const lastName = userData.lastName;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      firstName,
      lastName,
      role: 'CUSTOMER',
      password: hashedPassword
    });
    const order = new Order({
      amount: 0,
      address: "Default address",
      orderStatus: 'PENDING',
      user: user
    });

    await order.save();


    await user.save();
    return user;
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    throw error; // ✅ REQUIRED
  }
};

const loginUser = async (userData) => {
  try {
    const email = userData.email;
    const password = userData.password;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error('User not exist');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return token;
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    throw error; // ✅ REQUIRED
  }
};

module.exports = { createUser, loginUser };
