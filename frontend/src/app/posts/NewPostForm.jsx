import { Button } from "@/components/ui/button";
import { FileType, ImageIcon, Laugh, Plus, Video, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import React from 'react'
import {Textarea} from "@/components/ui/textarea"
import { DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import  { useState } from "react";
import dynamic from "next/dynamic";

const Picker =dynamic(()=> import("emoji-picker-react"),{ssr:false})//dynamic import

export const NewPostForm = ({isPostFormOpen,setIsPostFormOpen}) => {
  const [filePreview,setFilePreview]=useState(null);
  const[showEmojiPicker,setShowEmojiPicker]=useState(false);
  const[postContent,setPostContent]=useState('')
  const handleEmojiClick=()=>
    {
      setPostContent(prev=> prev+emojiObject.emoji)
    }
  
  return (
   <Card>
   <CardContent>
    <div className='flex space-x-4'>
      <Avatar>
        <AvatarImage/>
        <AvatarFallback>RJ</AvatarFallback>
      </Avatar>
    <Dialog open={isPostFormOpen} onOpenChange={setIsPostFormOpen}>
    <DialogTrigger asChild>
  <div className="w-full">
    <Input 
      placeholder={`what is in ur mind shambhuraj !`}
      readOnly
      className="cursor-pointer rounded-full h-12 dark:bg-[rgb(58,59,60)] placeholder:text-gray-500 dark:placeholder:text-gray-400"
    />
    <Separator className='my-2 dark:bg-slate-400'/>
    <div className='flex justify-between'>
      <Button className="flex items-center justify-center " variant="ghost">
        <ImageIcon className='h-5 w-5 text-green-500 mr-2'/>
        <span className='dark:text-slate-100 '>photo</span>
      </Button>
      <Button className="flex items-center justify-center" variant="ghost">
        <Video className='h-5 w-5 text-red-500 mr-2'/>
        <span className='dark:text-slate-100'>Video</span>
      </Button>
      <Button className="flex items-center justify-center" variant="ghost">
        <Laugh className='h-5 w-5 text-yellow-500 mr-2'/>
        <span className='dark:text-slate-100'>feelings</span>
      </Button>
    </div>
  </div>
</DialogTrigger>
    <DialogContent className="sm-max-w-[525px] max-h-[80vh] overflow-y-auto ">
    <DialogHeader>
      <DialogTitle className="text-center">createPost</DialogTitle>
    </DialogHeader>
   <Separator/>
   <div className="flex items-center space-x-3 py-4">
     <Avatar className="h-10 w-10">
        <AvatarImage/>
        <AvatarFallback className="dark:bg-blue-400">RJ</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">shambhurtaj Gadhave</p>
      </div>
   </div>
    <Textarea placeholder={`what are you thinking,,shambhuraj?`}
    className="min-h-[100px] text-lg"
    />
    <AnimatePresence>
      <motion.div
      initial={{opacity:0,height:0}}
      animate={{opacity:1,height:"auto"}}
      exit={{opacity:0,height:0}}
      className="relative mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center"
      ><Button className="absolute top-2 right-2"
      variant="ghost"
      size="icon"
      >
        <X className="h-4 w-4"/>
      </Button>
      {filePreview ?(
        fileType.startsWith("image") ?(
          <img/>
        ):(
          <video/>
        )
      ):(<>
      <Plus className="h-12 w-12 text-gray-400 mb-2 cursor-pointer"/>
      <p className="text-center text-gray-500">add photos/videos</p>
      </>
      )}
      <input type="file" accept="image/*,video/*" className="hidden"/>

      </motion.div>
    </AnimatePresence>
    <div className="bg-gray-200 dark:bg-muted p-4 rounded-lg mt-4">
      <p>Add  your post NOW</p>
      <div className="flex space-x-2">
        <Button className="flex items-center justify-center cursor-pointer" variant="ghost">
          <ImageIcon className='h-5 w-5 text-green-500 mr-2'/>
        </Button>
        <Button className="flex items-center justify-center" variant="ghost">
          <Video className='h-5 w-5 text-red-500 mr-2'/>
        
        </Button>
        <Button className="flex items-center justify-center" variant="ghost" onClick={()=>
          setShowEmojiPicker(!showEmojiPicker)}>
          <Laugh className='h-5 w-5 text-yellow-500 mr-2'/>
        </Button>
      </div>
    </div>
    {showEmojiPicker && (
      <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      exit={{opacity:0,y:20}}
      className="relative"
      >
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10"
        onClick={()=>setShowEmojiPicker(false)}
        >
          <X className="h-4 w-4"/>
        </Button>
      <Picker onEmojiClick={handleEmojiClick}/>
      </motion.div>
    )}
    <div className="flex justify-end mt-4">
      <Button className="bg-red-500 text-white">post</Button>
    </div>
    </DialogContent>
    </Dialog>
    </div>
   </CardContent>
   </Card>
  )
}
