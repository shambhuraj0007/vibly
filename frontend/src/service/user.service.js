import axiosInstance from "./url.service";

export const getAllFriendsRequest = async() =>{
    try {
         const response = await axiosInstance.get('/users/friends-request')
        console.log(response?.data);
         return response?.data;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}

export const getAllFriendsSuggestion = async() =>{
    try {
         const response = await axiosInstance.get('/users/user-to-request')
         return response?.data;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}


export const followUser = async(userId) =>{
    try {
         const response = await axiosInstance.post('/users/follow', {userIdToFollow:userId})
         console.log(response?.data);
         return response?.data;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}


export const UnfollowUser = async(userId) =>{
    try {
         const response = await axiosInstance.post('/users/unfollow', {userIdToUnFollow:userId})
         return response?.data;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}


export const deleteUserFromRequest = async(userId) =>{
    try {
         const response = await axiosInstance.post('/users/friend-request/remove', {requestSenderId:userId})
         return response?.data;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}


export const fetchUserProfile = async(userId) =>{
    try {
         const response = await axiosInstance.get(`/users/profile/${userId}`)
         return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}



export const getMutualFriends = async(userId) =>{
    try {
         const response = await axiosInstance.get(`/users/mutual-friends/${userId}`)
         return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}


export const getAllFriends = async () => {
  const response = await axiosInstance.get('/users/friends');
  return response.data;
};

export const deleteFriend = async (friendId) => {
  try {
    const response = await axiosInstance.delete(`/users/friends/${friendId}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const updateUserProfile = async(userId,updateData) =>{
    try {
         const response = await axiosInstance.put(`/users/profile/${userId}`,updateData)
         return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}


export const updateUserCoverPhoto = async(userId,updateData) =>{
    try {
         const response = await axiosInstance.put(`/users/profile/cover-photo/${userId}`,updateData)
         return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}


export const createOrUpdateUserBio = async(userId,bioData) =>{
    try {
         const response = await axiosInstance.put(`/users/bio/${userId}`,bioData)
         return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}

export const getAllUsers = async() =>{
    try {
         const response = await axiosInstance.get('/users')
         return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}




