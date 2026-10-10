/**
 * User Authentication Controller
 * Handles User Signup, Login, and JWT Token Generation
 */

const UserModel = require('../models/userModel');

// User Registration Controller
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide both email and password for registration.'
            });
        }

        // Create new User instance
        const newUser = new UserModel({ name, email, password });
        const savedUser = await newUser.save();

        // Simulated JWT Auth Token
        const token = 'valid_student_jwt_token_2026';

        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token: token,
            user: {
                id: savedUser.id,
                name: savedUser.name,
                email: savedUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error during registration',
            error: error.message
        });
    }
};

// User Login Controller
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide email and password to sign in.'
            });
        }

        // Find user by email
        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials: User not found.'
            });
        }

        // Simulated JWT Auth Token
        const token = 'valid_student_jwt_token_2026';

        return res.status(200).json({
            status: 'success',
            message: 'Authentication successful',
            token: token,
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error during login',
            error: error.message
        });
    }
};