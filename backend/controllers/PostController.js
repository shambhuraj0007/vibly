const Post = require('../model/Post'); // Assuming you have a Post model
const { uplodFileTOCloudinary } = require('../config/cloudinary'); // Import the
const responce = require("../utils/responceHandler")
const Story = require('../model/story'); // Assuming you have a Story model


const createPost = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming user ID is stored in req.user
    const { content } = req.body; // Extract content from request body
    const file = req.file; // Extract file from request (if any)
    let mediaUrl = null;
    let mediaType = null;
    if (file) {
      const uplodeResult = await uplodFileTOCloudinary(file);
      console.log("File uploaded to Cloudinary:", uplodeResult);
      mediaUrl = uplodeResult?.secure_url;
      mediaType = file.mimetype.startsWith('video') ? 'video' : 'image';
    }
    // Create a new post object
    const newPost = await new Post({
      user: userId,
      content: content,
      mediaUrl: mediaUrl,
      mediaType: mediaType,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0
    })
    await newPost.save();
    return responce(res, 201, "post created sucessfully", newPost);

  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
}
//cretate story
const createStory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadResult = await uplodFileTOCloudinary(file);
    console.log("File uploaded to Cloudinary:", uploadResult);

    const mediaUrl = uploadResult?.secure_url;
    const mediaType = file.mimetype.startsWith('video') ? 'video' : 'image';

    const newStory = await Story.create({
      user: userId,
      mediaUrl,
      mediaType
    });

    return responce(res, 201, "Story created successfully", newStory);

  } catch (error) {
    console.error("Error creating story:", error);
    res.status(500).json({ message: 'Error creating story', error: error.message || error });
  }
};

const deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.status(200).json({ message: "Story deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete story", error: err.message });
  }
};

//getAllStories
const getAllStory = async (req, res) => {
  try {
    const story = await Story.find().sort({ createdAt: -1 })
      .populate('user', '_id username profilePicture email'); // Fetch all stories sorted by creation date
    return responce(res, 201, "All Stories fetched successfully", story);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stories', error });
  }
}


// Function to get all posts
const getAllPosts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const posts = await Post.find().sort({ createdAt: -1 })
      .populate('user', '_id username profilePicture email')
      .populate({
        path: 'comments.user',
        select: 'username, profilePicture '
      });
    const postsWithLiked = posts.map(post => {
      const postObj = post.toObject();
      postObj.liked = post.likes.includes(userId);
      return postObj;
    });
    return responce(res, 201, "All Posts fetched successfully", postsWithLiked);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
}
const getPostsByUserId = async (req, res) => {
  const { userId } = req.params; // Get user ID from request parameters
  try {
    if (!userId) return res.status(400).json({ message: 'User ID is required to get post' });
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 })
      .populate('user', '_id username profilePicture email')
      .populate({
        path: 'comments.user',
        select: 'username, profilePicture '
      })
    return responce(res, 201, "Posts fetched successfully", posts);
  } catch (error) {
    console.error('Error fetching posts by user ID:', error);
    res.status(500).json({ message: 'Error fetching posts', error });
  }
}

const likePost = async (req, res) => {
  const { postId } = req.params; // Get post ID from request parameters
  const userId = req.user.userId; //from req.user
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return responce(res, 404, "Post not found");
    }
    const hasLiked = post.likes.includes(userId)
    if (hasLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
      post.likeCount = Math.max(0, post.likeCount - 1);// Ensure like count doesn't go below 0
    }
    else {
      post.likes.push(userId);
      post.likeCount += 1;
    }
    // Save the likes in updated post
    const updatedPost = await post.save();
    return responce(res, 201, hasLiked ? "Post unliked successfully" : "Post liked successfully", {
      likeCount: updatedPost.likeCount,
      liked: !hasLiked,
      postId: updatedPost._id
    });
  } catch (error) {
    return responce(res, 500, "internal server error", error.message);
  }
}
//post comments by use
const addCommentTOPost = async (req, res) => {
  const { postId } = req.params; // Get post ID from request parameters
  const userId = req.user.userId; //from req.user
  const { text } = req.body; // Get comment text from request body
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return responce(res, 404, "Post not found");
    }
    const comment = {
      user: userId,
      text: text,
      createdAt: new Date()
    };
    post.comments.push(comment);
    post.commentCount += 1;
    await post.save();
    return responce(res, 201, "Comment added successfully", post);
  } catch (error) {
    console.error('Error adding comment to post:', error);
    res.status(500).json({ message: 'Error adding comment', error });
  }
}
//share on post by user
const sharePost = async (req, res) => {
  const { postId } = req.params; // Get post ID from request parameters
  const userId = req.user.userId; //from req.user
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return responce(res, 404, "Post not found");
    }
    const hasUserShared = post.share.includes(userId);
    if (!hasUserShared) {
      post.share.push(userId);
    }
    post.shareCount += 1;
    await post.save();
    return responce(res, 201, "Post shared successfully", post);
  } catch (error) {
    console.error('Error sharing post:', error);
    res.status(500).json({ message: 'Error sharing post', error });
  }
}
module.exports = {
  createPost,
  getAllPosts,
  getPostsByUserId,
  likePost,
  addCommentTOPost,
  sharePost,
  createStory,
  deleteStory,
  getAllStory
}