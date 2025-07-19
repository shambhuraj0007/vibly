const express = require('express');
const router = express.Router();


const { authMiddleware } = require('../middlewares/authMiddleware');
const { multerMiddleware } = require('../config/cloudinary');
const{ createPost, getAllPosts,deleteStory, getPostsByUserId, likePost, addCommentTOPost, sharePost, createStory, getAllStory } = require('../controllers/PostController');


console.log({ authMiddleware, multerMiddleware, createPost }); 
// Route to create a new post
router.post('/', authMiddleware, multerMiddleware.single('media'), createPost);
// Route to get all posts
router.get('/', authMiddleware, getAllPosts);
// Route to get posts by user ID
router.get('/user/:userId', authMiddleware, getPostsByUserId);
//user like post route
router.get('/likes/:postId', authMiddleware, likePost);
//user share post route
router.post('/share/:postId', authMiddleware, sharePost);
// user comment on post route
router.post('/comments/:postId', authMiddleware, addCommentTOPost);
// Route to create a new story
router.post('/story', authMiddleware, multerMiddleware.single('media'), createStory);
// Route to get all stories
router.get('/story', authMiddleware, getAllStory);
// Delete story route
router.delete("/:id", deleteStory);

module.exports = router;



// This code sets up a route for creating posts. It uses the `authMiddleware` to ensure 
// that the user is authenticated before allowing them to create a post. The `multerMiddleware`
//  is used to handle file uploads, allowing users to attach media (images or videos) to their posts.
//  The `createPost` function in the `PostController` handles the logic for creating a new post in the database.