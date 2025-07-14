import axiosInstance from './axiosInstance';




// Function to create a new post
export const createPost= async (postData) => {
    try {
        const response = await axiosInstance.post('users/posts', postData);
        return response?.data?.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

// Function to create a story
// This function sends a POST request to the 'users/story' endpoint with the provided postData
export const createStory= async (postData) => {
    try {
        const response = await axiosInstance.post('users/story', postData);
        return response?.data?.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

//get all post method 
export const getAllPosts = async() =>{
    try {
         const result = await  axiosInstance.get('/users/posts')
         return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

//get all story method 
export const getAllStory = async() =>{
    try {
         const result = await  axiosInstance.get('/users/story')
         return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}



//method for like a post
export const likePost = async(postId) =>{
    try {
         const result = await  axiosInstance.post(`/users/posts/likes/${postId}`)
         return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}


//method for comments a post
export const commentsPost = async(postId,comment) =>{
    try {
         const result = await  axiosInstance.post(`/users/posts/comments/${postId}`,comment)
         return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

//method for share a post
export const sharePost = async(postId) =>{
    try {
         const result = await  axiosInstance.post(`/users/posts/share/${postId}`)
         return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}


//get all users posts 
export const getAllUserPosts = async(userId)=>{
    try {
        const result = await axiosInstance.get(`/users/posts/user/${userId}`)
        return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}