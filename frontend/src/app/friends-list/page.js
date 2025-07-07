"use client";
import React, { useEffect, useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import { NoFriendsMessage, FriendCardSkeleton } from "@/lib/skeleton";
import FriendRequest from "./FriendRequest";
import { FriendsSuggestion } from "./FriendsSuggestion";

const Page = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // loading for 1.5s
    return () => clearTimeout(timer);
  }, []);

  const friendRequests = [
  {
    name: "Aarav Mehta",
    status: "pending",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Diya Sharma",
    status: "pending",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Rahul Verma",
    status: "pending",
    image: "https://randomuser.me/api/portraits/men.jpg",
  },
  {
    name: "Sneha Reddy",
    status: "pending",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Yash Rajput",
    status: "pending",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
  },
];

  const friendSuggestions = [
  {
    name: "Raj Nagar",
    status: "accepted",
    image: "https://randomuser.me/api/portraits/men/91.jpg",
  },
  {
    name: "Isha Kulkarni",
    status: "accepted",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Kunal Thakur",
    status: "accepted",
    image: "https://randomuser.me/api/portraits/men/48.jpg",
  },
  {
    name: "Meera Nair",
    status: "accepted",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    name: "Arjun Bansal",
    status: "accepted",
    image: "https://randomuser.me/api/portraits/men/80.jpg",
  },
];


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[rgb(36,37,38)]">
      <LeftSideBar />

      <main className="ml-0 md:ml-64 mt-16 p-6">
        {/* Friend Requests */}
        <h1 className="text-2xl font-bold mb-6">Friend Requests</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            [...Array(4)].map((_, i) => <FriendCardSkeleton key={i} />)
          ) : friendRequests.length === 0 ? (
            <NoFriendsMessage
              text="No Friend Requests Yet"
              description="Get to know new people by sending friend requests."
            />
          ) : (
            friendRequests.map((friend, index) => (
              <FriendRequest key={index} friend={friend} />
            ))
          )}
        </div>

        {/* People You May Know */}
        <h1 className="text-2xl font-bold mb-6 mt-12">People You May Know</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            [...Array(4)].map((_, i) => <FriendCardSkeleton key={i} />)
          ) : friendSuggestions.length === 0 ? (
            <NoFriendsMessage
              text="No Friend Suggestions"
              description="Let's connect with people around the world."
            />
          ) : (
            friendSuggestions.map((friend, index) => (
              <FriendsSuggestion key={index} friend={friend} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
