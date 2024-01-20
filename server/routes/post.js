const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema');
const User = require('../models/userSchema');



//create a post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        return res.status(200).json({ message: 'Post saved' })
    } catch (err) {
        return res.status(422).json(err)
    }
})

//update a post
router.put('/:id', async (req, res) => {
    try {
        const updatePost = await Post.findById(req.params.id);
        if (updatePost.userId === req.body.userId) {
            await updatePost.updateOne({ $set: req.body });
            return res.status(200).json({ message: 'Post has been updated' })
        } else {
            return res.status(422).json({ message: 'You can only update your post' })
        }
    } catch (err) {
        return res.status(422).json(err)
    }
})


// delete a post
router.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Post.findById(req.params.id);
        if (deletePost.userId === req.body.userId) {
            await deletePost.deleteOne();
            return res.status(200).json({ message: 'Post has been Deleted' })
        } else {
            return res.status(422).json({ message: 'You can only delete your post' })
        }
    } catch (err) {
        return res.status(422).json(err)
    }
})
//like  & dislike a post
router.put('/:id/like', async (req, res) => {
    try {
        const likePost = await Post.findById(req.params.id);
        if (!likePost.likes.includes(req.body.userId)) {
            await likePost.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json({ message: 'Post has been Liked' })
        } else {
            await likePost.updateOne({ $pull: { likes: req.body.userId } });
            return res.status(200).json({ message: 'Post has been Disliked' })

        }
    } catch (err) {
        return res.status(422).json(err)
    }
})

//get a post
router.get('/:id', async (req, res) => {
    try {
        const getPost = await Post.findById(req.params.id);
        res.status(200).json(getPost);
    } catch (err) {
        return res.status(422).json(err)
    }
})


//get all/timeline post
router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId : currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId : friendId})
            })
        );
        return res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        return res.status(422).json(err)
    }

})

//get a user's all post
router.get('/profile/:username', async (req, res) => {
    try {
        const currentUser = await User.findOne({username:req.params.username});
        const userPosts = await Post.find({userId : currentUser._id});
        return res.status(200).json(userPosts)
    } catch (err) {
        return res.status(422).json(err)
    }
})
module.exports = router;