const express = require('express');
const router = express.Router();
const { multerMiddleware } = require('../config/cloudinary');
const { authMiddleware } = require('../middlewares/authMiddleware');
const {followUser,
    unfollowUser,
    deleteUserFromRequest,
    getAllFriendsRequest,
    getAllUserForRequest,
    getAllMutualFriends,
    getAllUser,
    checkUserAuth,
    getUserProfile,
    getAllFriendsForLoggedInUser} = require('../controllers/userController');
    
//user routes
const { createOrUpdateUserBio,
  updateCoverPhoto,
  updateUserProfile } = require('../controllers/createOrUpdateController');




//user following route
router.post('/follow', authMiddleware, followUser);
//user unfollowing route
router.post('/unfollow', authMiddleware, unfollowUser);
//remove user from request
router.post('/friend-request/remove', authMiddleware, deleteUserFromRequest);
//get all friends of user
router.get('/friends-request', authMiddleware, getAllFriendsRequest);
//get all users for request
router.get('/user-to-request', authMiddleware, getAllUserForRequest);
//get all mutual friends
router.get('/mutual-friends/:userId', authMiddleware, getAllMutualFriends);
//get all friends for logged-in user
router.get('/friends', authMiddleware, getAllFriendsForLoggedInUser);
//get all users from search
router.get('/', authMiddleware, getAllUser);
//check user authentication
router.get('/check-auth', authMiddleware, checkUserAuth);
//get user profile  
router.get('/profile/:userId', authMiddleware, getUserProfile);
//create or update user bio
router.put('/bio/:userId', authMiddleware, createOrUpdateUserBio);
//update user cover photo
router.put('/profile/cover-photo/:userId', authMiddleware, multerMiddleware.single('coverPhoto'), updateCoverPhoto);
//update user profile
router.put('/profile/:userId', authMiddleware,multerMiddleware.single('profilePicture'), updateUserProfile);



module.exports = router;

