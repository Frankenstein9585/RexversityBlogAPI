const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')


const getUser = async (req, res, next) => {
    let user;
    try {
        user =  await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    res.user = user;
    next();
}

// Get all Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Get one user
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Creating a user
router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        user.password = await bcrypt.hash(req.body.password, 10);
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


//Update a user
router.patch('/:id', getUser, async (req, res) => {
    const { title, content } = req.body;

    if (title) {
        res.user.title = title;
    }

    if (content) {
        res.user.content = content;
    }

    res.user.updatedAt = Date.now();

    try {
        const updatedUser = await res.user.save();
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Delete a user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({message: 'User deleted successfully'});
    }  catch (error) {
        res.status(500).json({error: error.message});
    }
});



module.exports = router;