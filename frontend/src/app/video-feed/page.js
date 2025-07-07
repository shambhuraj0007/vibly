"use client"
import React, { useEffect, useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import VideoCard from './VideoCard'
import { useRouter } from 'next/navigation';

 

 const page = () => {
   const videoPosts = [
  {
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // public demo video
    mediaType: 'video',
    user: { username: 'rahul_patil' },
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
];

const router = useRouter();

  const handleNavigation = (path,item) => {
      router.push(path);
  }

  return (
    
    <div className='mt-12  min-h-screen'>
        <LeftSideBar/>
        <main className='ml-0 md:ml-64 p-6'>
            <Button variant="ghost" className="mb-4"
             onClick={() => handleNavigation('/')}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to feed
            </Button>
            <div className="max-w-3xl mx-auto">
                 {videoPosts.map((post, index) => (
                    <VideoCard key={index} post={post} />
                    ))}

            </div>
        </main>
        </div>
  )
}

export default page
