const express = require('express');

const User = require('../models/user.js')

exports.registerController = async (req , res ) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user', error });
    
    }

}
exports.loginController = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.findOne({ email, role });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or role' });
        }

        if (password === user.password) {
            return res.status(200).json({ message: 'Login successful', role: user.role });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Failed to login user', error });
    }
};
