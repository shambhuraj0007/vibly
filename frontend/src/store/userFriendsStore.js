import { deleteUserFromRequest, followUser as followUserService, getAllFriendsRequest, getAllFriendsSuggestion, getMutualFriends, UnfollowUser, getAllFriends, deleteFriend } from "@/service/user.service";
import toast from "react-hot-toast";
import { create } from "zustand";





export const userFriendStore = create((set,get) => ({
    friendRequest:[],
    friendSuggestion:[],
    mutualFriends:[],
    friends:[],
    loading:false,

   fetchFriendRequest: async() =>{
    set({loading:true})
    try {
          const friend = await getAllFriendsRequest();
          set({friendRequest: friend.data, loading:false})
    } catch (error) { 
       set({error, loading:false})
    }finally{
      set({loading:false})
    }
   },

   fetchFriendSuggestion: async() =>{
    set({loading:true})
    try {
          const friend = await getAllFriendsSuggestion();
          set({friendSuggestion: friend.data, loading:false})
    } catch (error) { 
       set({error, loading:false})
    }finally{
      set({loading:false})
    }
   },
   fetchMutualFriends: async(userId) =>{
    set({loading:true})
    try {
          const friend = await getMutualFriends(userId);
          set({mutualFriends: friend, loading:false})
    } catch (error) { 
       set({error, loading:false})
    }finally{
      set({loading:false})
    }
   },
   fetchFriends: async () => {
    set({ loading: true });
    try {
      const friends = await getAllFriends();
      set({ friends: friends.data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    } finally {
      set({ loading: false });
    }
   },
   followUser:async(userId) =>{
    set({loading:true})
    try {
        await followUserService(userId)
    } catch (error) {
      set({error, loading:false})
    }
   },
   UnfollowUser: async(userId) =>{
    set({loading:true})
    try {
        await UnfollowUser(userId)
    } catch (error) {
      set({error, loading:false})
    }
   },
   deleteUserFromRequest: async(userId) =>{
    set({loading:true})
    try {
        await deleteUserFromRequest(userId)
        toast.success("you have deleted friend successfully")
    } catch (error) {
      set({error, loading:false})
    }
   },
   deleteFriend: async(friendId) =>{
    set({loading:true})
    try {
        await deleteFriend(friendId)
        toast.success("Friend removed successfully")
    } catch (error) {
      set({error, loading:false})
      toast.error("Failed to remove friend")
    }finally{
      set({loading:false})
    }
   }

}))