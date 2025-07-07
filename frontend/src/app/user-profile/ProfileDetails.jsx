"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Cake,
  GraduationCap,
  Heart,
  Home,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import IntroCard from "./profileContent/IntroCard";
import EditBio from "./profileContent/EditBio";
import PostsContent from "./profileContent/postsContent";
import MutualFriends from "./profileContent/MutualFriends";

// Dummy data
const dummyProfile = {
  username: "Shambhuraj Gadhave",
  email: "sham@example.com",
  dateOfBirth: "2002-09-17",
  followingCount: 2320,
  bio: {
    bioText: "Loves building things with MERN stack.",
    liveIn: "Pune, Maharashtra",
    hometown: "Sangli",
    relationship: "Single",
    education: "SPPU, Computer Engineering",
    workplace: "OpenAI",
    phone: "+91-9876543210",
  },
};

const posts = [
  {
    _id: 1,
    content: "Exploring the mountains 🌄 #nature #adventure",
    mediaUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    mediaType: "image",
  },
  {
    _id: 2,
    content: "My dog learning to catch treats 😂🐶",
    mediaUrl: "https://th.bing.com/th/id/OIP.oBQbv3ppTXRXuoW2gvDhzQHaJZ",
    mediaType: "image",
  },
  {
    _id: 3,
    content: "Sunset by the beach 🏖️ One of the best evenings!",
    mediaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    mediaType: "image",
  },
  {
    _id: 4,
    content: "Quick tips to stay productive during the day ☕💻",
    mediaUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    mediaType: "image",
  },
  {
    _id: 5,
    content: "Just made this creamy pasta recipe 🍝✨ So good!",
    mediaUrl: "https://th.bing.com/th/id/OIP.LEdc3tRwe6abD0UFOkZEBwHaD4",
    mediaType: "image",
  },
];

const dummyFriends = [
  {
    _id: "1",
    username: "Alice",
    profilePicture: "/images/alice.jpg",
    followerCount: 120,
  },
  {
    _id: "2",
    username: "Bob",
    profilePicture: "",
    followerCount: 98,
  },
];

const ProfileDetails = ({ activeTab }) => {
  const [isEditBioModel, setIsEditBioModel] = useState(false);

  const tabContent = {
    posts: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-6"
      >
       <div className="flex flex-col lg:flex-row gap-6">
  {/* Posts */}
  <div className="w-full lg:w-[70%] space-y-6 mb-4">
    {posts.map((post) => (
      <PostsContent key={post._id} post={post} />
    ))}
  </div>

  {/* Intro */}
 
    <IntroCard
      profile={dummyProfile}
      isOwner={true}
      onEditBio={() => setIsEditBioModel(true)}
    />
  
</div>

      </motion.div>
    ),

    about: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 px-2 sm:px-4"
      >
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">
              About {dummyProfile.username}
            </h2>
            <div className="space-y-4 dark:text-gray-300 text-sm sm:text-base">
              <div className="flex items-center"><Briefcase className="w-5 h-5 mr-2" /><span>{dummyProfile.bio.workplace}</span></div>
              <div className="flex items-center"><GraduationCap className="w-5 h-5 mr-2" /><span>{dummyProfile.bio.education}</span></div>
              <div className="flex items-center"><Home className="w-5 h-5 mr-2" /><span>{dummyProfile.bio.liveIn}</span></div>
              <div className="flex items-center"><Heart className="w-5 h-5 mr-2" /><span>{dummyProfile.bio.relationship}</span></div>
              <div className="flex items-center"><MapPin className="w-5 h-5 mr-2" /><span>{dummyProfile.bio.hometown}</span></div>
              <div className="flex items-center"><Phone className="w-5 h-5 mr-2" /><span>{dummyProfile.bio.phone}</span></div>
              <div className="flex items-center"><Mail className="w-5 h-5 mr-2" /><span>{dummyProfile.email}</span></div>
              <div className="flex items-center"><Cake className="w-5 h-5 mr-2" /><span>Birthday: 17/09/2002</span></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ),

    friends: (
      <div className="px-2 sm:px-4">
        <MutualFriends mutualFriends={dummyFriends} isOwner={true} />
      </div>
    ),

    photos: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 px-2 sm:px-4"
      >
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">
              Photos
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {posts
                .filter((post) => post.mediaType === "image" && post.mediaUrl)
                .map((post) => (
                  <img
                    key={post._id}
                    src={post.mediaUrl}
                    alt="user_photo"
                    className="w-full h-[140px] sm:h-[150px] object-cover rounded-lg"
                  />
                ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ),
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
      {tabContent[activeTab] || null}
      <EditBio isOpen={isEditBioModel} onClose={() => setIsEditBioModel(false)} />
    </div>
  );
};

export default ProfileDetails;
