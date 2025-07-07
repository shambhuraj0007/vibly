"use client";
import React, { useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import StorySection from "../story/StorySection";
import { NewPostForm } from "../posts/NewPostForm";
import  PostCard  from "../posts/PostCard";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const HomePage = () => {
  const [isPostFormOpen,SetIsPostFormOpen]=useState(false)
 const posts = [
  {
    _id: 1,
    content: "Exploring the mountains 🌄 #nature #adventure",
    mediaUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    mediaType: "image",
     comments: [
      {
        user: {
          username: 'aarti_kulkarni',
          text: 'Wow, this is so informative. Thanks for sharing!',
        },
      },
      {
        user: {
          username: 'siddharth_s',
          text: 'Loved the visuals in this video 🔥',
        },
      },
      {
        user: {
          username: 'neha_verma',
          text: 'Can you make a part 2 of this topic?',
        },
      },
      {
        user: {
          username: 'anil.k',
          text: 'Great work! Keep it up 👍',
        },
      },
    ],
  },
  {
    _id: 2,
    content: "My dog learning to catch treats 😂🐶",
    mediaUrl: "https://th.bing.com/th/id/OIP.oBQbv3ppTXRXuoW2gvDhzQHaJZ?w=186&h=237&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
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
    mediaUrl: "https://th.bing.com/th/id/OIP.LEdc3tRwe6abD0UFOkZEBwHaD4?w=321&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    mediaType: "image",
  }
];


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* Main content area */}
      <main className="flex flex-1 pt-16">
       <LeftSideBar/>
       <div className="flex-1 p-4 py-6 md:ml-64 lg:mr-64 xl:max-w-3xl xl:mx-w-3xl mx-auto">
        <div className="lg:ml-2 xl:ml-28">
          <StorySection/>
       <NewPostForm
  isPostFormOpen={isPostFormOpen}
  setIsPostFormOpen={SetIsPostFormOpen}
/>

          <div className="mt-6 space-y-6">
          {posts.map(post=>(
            <PostCard
            key={post._id}
            post={post}
            />
          ))}
          </div>

        </div>
       </div>
        <div className="hidden lg:block lg:w-64 xl:w-80 fixed right-0 top-16 bottom-0 overflow-y-auto p-4">
        <RightSideBar />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
