"use client";
import React, { useEffect, useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import { FriendCardSkeleton, NoFriendsMessage } from "@/lib/Skeleton";
import FriendRequest from "./FriendRequest";
import FriendsSuggestion from "./FriendsSuggestion";
import { userFriendStore } from "@/store/userFriendsStore";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/Utils";

const Page = () => {
  const {
    followUser,
    loading,
    UnfollowUser,
    fetchFriendRequest,
    fetchFriendSuggestion,
    deleteUserFromRequest,
    fetchMutualFriends,
    fetchFriends,
    friendRequest,
    friendSuggestion,
    mutualFriends,
    friends,
  } = userFriendStore();

  useEffect(() => {
    fetchFriendRequest(), fetchFriendSuggestion(), fetchFriends();
  }, []);

  const handleAction = async (action, userId) => {
    if (action === "confirm") {
      toast.success("friend added successfully");
      await followUser(userId);
      fetchFriendRequest();
      fetchFriendSuggestion();
      fetchFriends(); // Refresh the friends list after accepting a request
    } else if (action === "delete") {
      await UnfollowUser(userId);
      fetchFriendRequest();
      fetchFriendSuggestion();
      fetchFriends(); // Refresh the friends list after deleting a request
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-background ">
      <LeftSideBar />
      <main className="ml-0 md:ml-64 mt-16 p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-primary drop-shadow">
          Friends Requests
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            <FriendCardSkeleton />
          ) : friendRequest.length === 0 ? (
            <NoFriendsMessage
              text="No Friend Requests"
              description="connect with your friends and start a conversation! using Vibly and vibe"
            />
          ) : (
            friendRequest.map((friend) => (
              <FriendRequest
                key={friend._id}
                friend={friend}
                loading={loading}
                onAction={handleAction}
              />
            ))
          )}
        </div>

        <h1 className="text-3xl font-extrabold mb-8 mt-12 text-secondary drop-shadow">
          People you may know
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            <FriendCardSkeleton />
          ) : friendSuggestion.length === 0 ? (
            <NoFriendsMessage
              text="No Friend Suggestion"
              description="connect with your friends and start a conversation! using Vibly and vibe"
            />
          ) : (
            friendSuggestion.map((friend) => (
              <FriendsSuggestion
                key={friend._id}
                friend={friend}
                loading={loading}
                onAction={handleAction}
              />
            ))
          )}
        </div>

        {/* Friends List Section */}
        <h1 className="text-3xl font-extrabold mb-8 mt-12 text-primary drop-shadow">
          Friends List
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            <FriendCardSkeleton />
          ) : friends.length === 0 ? (
            <NoFriendsMessage
              text="No Friends Yet"
              description="You haven't connected with anyone yet. Start making friends!"
            />
          ) : (
            friends.map((friend) => (
              <div
                key={friend._id}
                className="bg-white/80 dark:bg-[#232946cc] backdrop-blur-xl rounded-2xl shadow-xl p-6 flex flex-col items-center"
              >
                <img
                  src={friend.profilePicture || "/public/images/sss.png"}
                  alt={friend.username}
                  className="w-20 h-20 rounded-full mb-2 object-cover border-4 border-primary shadow-lg"
                />
                <div className="font-bold text-lg text-primary mt-2">
                  {friend.username}
                </div>
                <div className="text-gray-500 text-sm">{friend.email}</div>
                <div className="text-gray-400 text-xs mt-1">
                  {friend.followerCount} followers
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
