const bcrypt = require('bcrypt');
const User = require("../model/User");
const Jwt = require("jsonwebtoken");
// const expressjwt = require("express-jwt");
const { expressjwt } = require('express-jwt');

require('cookie-parser')

const JWT_SECRET = process.env.jwt_secret; // Replace with your actual JWT secret



//SignUp metod

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ message: "All input is required" });
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).json({ message: "User already exists. Please login" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email, 
            password: encryptedPassword
        });

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//SignIn metod

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: 'error', error: 'Invalid email/password' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (passwordCompare) {
            // The email, password combination is successful
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                JWT_SECRET,
                { expiresIn: '24h' } // Expires in 24 hours
            );

            return res.status(200).json({ user, token });
        } else {
            return res.status(400).json({ status: 'error', error: 'Check the password again' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', error: 'Server error' });
    }
};


// //middleware

exports.isSignedIn=expressjwt({
    secret:JWT_SECRET,
    userProperty: "auth",
    algorithms: ['HS256'],
})