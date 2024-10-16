const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


const getPost = async (req, res, next) => {
    let post;
    try {
        post =  await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({message: 'Post not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    res.post = post;
    next();
}

// Get all Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Get one post
router.get('/:id', getPost, (req, res) => {
   res.json(res.post);
});

// Creating a post
router.post('/', async (req, res) => {
   const { title, content } = req.body;
   const post = new Post({
       title,
       content
   });

   try {
       const newPost = await post.save();
       res.status(201).json(newPost);
   } catch (error) {
       res.status(400).json({error: error.message});
   }
});


//Update a post
router.patch('/:id', getPost, async (req, res) => {
    const { title, content } = req.body;

    if (title) {
        res.post.title = title;
    }

    if (content) {
        res.post.content = content;
    }

    res.post.updatedAt = Date.now();

    try {
        const updatedPost = await res.post.save();
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Delete a post
router.delete('/:id', getPost, async (req, res) => {
   try {
       await res.post.deleteOne();
       res.json({message: 'Post deleted successfully'});
   }  catch (error) {
       res.status(500).json({error: error.message});
   }
});



module.exports = router;