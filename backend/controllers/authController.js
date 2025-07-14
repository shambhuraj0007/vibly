const User = require('../model/User');
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken');
const response = require('../utils/responceHandler'); 

const registerUser = async (req, res) => {
  try {
    const { username, email, password, gender,dateOfBirth  } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response(res, 400, 'User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser);

    // Set auth cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: true, // set true only in production
      sameSite: 'none',
    });

    return response(res, 201, 'User registered successfully', {
      username: newUser.username,
      email: newUser.email,
      dateOfBirth: newUser.dateofbirth,
    });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); // ✅ Fix here
    if (!user) {
      return response(res, 404, 'User not found or wrong email');
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return response(res, 401, 'Invalid password');
    }

    const accessToken = generateToken(user);

    res.cookie('auth_token', accessToken, {
      httpOnly: true,
    });

    return response(res, 200, 'Login successful', { // ✅ Use status 200 for login
      username: user.username,
      email: user.email,
    });

  } catch (error) {
    console.error('Error login user:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


const logout = (req,res) =>{
    try {
        res.cookie("auth_token", "", {
            httpOnly: true,
            sameSite:"none",
            secure:true,
            expires: new Date(0)
        })
        return response(res,200,"User logged out successfully")
    } catch (error) {
        console.error(error)
        return response(res,500,"Internal Server Error",error.message)
    }
}
module.exports = {registerUser,loginUser,logout}