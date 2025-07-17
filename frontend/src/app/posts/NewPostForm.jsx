"use client";

import { Button } from "@/components/ui/button";
import {
  ImageIcon,
  Laugh,
  Plus,
  Video,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import userStore from "@/store/userStore";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { usePostStore } from "@/store/usePostStore";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const NewPostForm = ({ isPostFormOpen, setIsPostFormOpen }) => {
  const { user } = userStore();
  const [filePreview, setFilePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [FileType, setFileType] = useState(null);
  const[loading , setLoading] = useState(false);
  const {handleCreatePost}=usePostStore();
  const[showImageUpload, setShowImageUpload] = useState(false);
  const fileInputRef = React.useRef(null);



  const handleEmojiClick = (emojiObject) => {
    setPostContent((prev) => prev + emojiObject.emoji);
  };

  const handleFileChange=(e)=>{
    const file = e.target.files[0];
    if (!file) return;
     setSelectedFile(file);
     setFileType(file.type);
    setFilePreview(URL.createObjectURL(file));
  }

  const handlePost=async()=>{
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("content", postContent);
      if(selectedFile){
        formData.append("media", selectedFile);        
      }
      await handleCreatePost(formData);
      setPostContent("");
      setSelectedFile(null);
      setFilePreview(null);
      setIsPostFormOpen(false); 
    } catch (error) {
           console.error(error);
           setLoading(false);
    }
  }

  const userPlaceholder =
    typeof user?.username === "string"
      ? user.username
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "?";

  return (
    <Card>
      <CardContent>
        <div className="flex space-x-4">
          <Avatar className="h-8 w-8">
            {user?.profilePicture ? (
              <AvatarImage src={user.profilePicture} alt={user.username} />
            ) : (
              <AvatarFallback className="dark:bg-gray-400">
                {userPlaceholder}
              </AvatarFallback>
            )}
          </Avatar>

          <Dialog open={isPostFormOpen} onOpenChange={setIsPostFormOpen}>
            <DialogTrigger asChild>
              <div className="w-full">
                <Input
                  placeholder={`What is on your mind, ${user?.username }?`}
                  readOnly
                  className="cursor-pointer rounded-full h-12 dark:bg-[rgb(58,59,60)] placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <Separator className="my-2 dark:bg-slate-400" />
                <div className="flex justify-between">
                  <Button className="flex items-center justify-center" variant="ghost">
                    <ImageIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="dark:text-slate-100">Photo</span>
                  </Button>
                  <Button className="flex items-center justify-center" variant="ghost">
                    <Video className="h-5 w-5 text-red-500 mr-2" />
                    <span className="dark:text-slate-100">Video</span>
                  </Button>
                  <Button className="flex items-center justify-center" variant="ghost">
                    <Laugh className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="dark:text-slate-100">Feelings</span>
                  </Button>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-center capitalize">Create Post</DialogTitle>
              </DialogHeader>
              <Separator />
              <div className="flex items-center space-x-3 py-4">
                <Avatar className="h-8 w-8">
                  {user?.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt={user.username} />
                  ) : (
                    <AvatarFallback className="dark:bg-gray-400">
                      {userPlaceholder}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold">{user?.username}</p>
                </div>
              </div>

              <Textarea
                placeholder={`What are you thinking, ${user?.username || "Shambhuraj"}?`}
                className="min-h-[100px] text-lg"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />

             {showImageUpload && (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="relative mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center"
    >
      <Button
        className="absolute top-2 right-2"
        variant="ghost"
        size="icon"
        onClick={() => {
          setFilePreview(null);
          setSelectedFile(null);
          setShowImageUpload(false);
        }}
      >
        <X className="h-4 w-4" />
      </Button>

                      {filePreview ? (
            FileType?.startsWith("image") ? (
              <img src={filePreview} alt="preview" className="max-h-64 rounded-lg" />
            ) : (
              <video src={filePreview} controls className="max-h-64 rounded-lg" />
            )
          ) : (
            <>
              <label htmlFor="media-upload">
                <Plus className="h-12 w-12 text-gray-400 mb-2 cursor-pointer" onClick={() => fileInputRef.current?.click()} />
              </label>
              <p className="text-center text-gray-500">Add photos/videos</p>
            </>
          )}

      <input
        id="media-upload"
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
    </motion.div>
  </AnimatePresence>
)}
          <div className="bg-gray-200 dark:bg-muted p-4 rounded-lg mt-4">
                <p>Add your post NOW</p>
                <div className="flex space-x-2">
                  <Button variant="ghost" className="cursor-pointer" onClick={() => 
                    setShowImageUpload(!showImageUpload)}>
                    <ImageIcon className="h-5 w-5 text-green-500 mr-2 cursor-pointer" />
                  </Button>
                  <Button className="cursor-pointer" variant="ghost"onClick={() => 
                    setShowImageUpload(!showImageUpload)}>
                    <Video className="h-5 w-5 text-red-500 mr-2" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Laugh className="h-5 w-5 text-yellow-500 mr-2" />
                  </Button>
                </div>
              </div>

              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="relative mt-2"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => setShowEmojiPicker(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Picker onEmojiClick={handleEmojiClick} />
                </motion.div>
              )}

              <div className="flex justify-end mt-4">
                <Button className="bg-red-500 text-white"
                onClick={handlePost}>
                
                {loading ? "Posting" : "Post"}
              </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewPostForm;
