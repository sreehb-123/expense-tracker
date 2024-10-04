import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', async(req,res) => {
    const {email,password} = req.body;
    
    if(!email || !password) {
        res.status(400).json({message: 'All fields are required.'});
    }
    
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        user = new User({
            email,
            password,
        })

        user.password = await bcrypt.hash(password,10);
        await user.save();

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET,{
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login', async(req,res) => {
    const {email,password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message: 'All fields are required.'});
    }

    try {
        let user = User.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'Invalid login details'});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid password'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/dashboard',authMiddleware, async(req,res) => {
    res.json({ message: 'Welcome to the dashboard'});
});

export default router;