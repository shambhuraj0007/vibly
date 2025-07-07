"use client"
import { TabsList, TabsTrigger,Tabs } from '@/components/ui/tabs'
import React from 'react'
import { useState} from "react";
import ProfileDetails from './ProfileDetails';
const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('posts')
  return (
    <div className='macx-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8'>
      <Tabs defaultValue='posts' className='w-full'onValueChange={setActiveTab}>
      <TabsList className={`grid w-full grid-cols-4`}>
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="friends">Friends</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
      </TabsList>
      <div className="mt-6">
        <ProfileDetails
        activeTab={activeTab}
          />
      </div>
      </Tabs>
    </div>
  )
}

export default ProfileTabs