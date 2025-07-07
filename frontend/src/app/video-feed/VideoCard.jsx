"use client";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MessageCircle, Send, Share2, ThumbsUp,ThumbsDown} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Copy,
} from "lucide-react";
import VideoComments from "./VideoComments";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";



const VideoCard = ({ post }) => {
   const[isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const [showComments, setShowComments] = useState(false);
     const generateSharedLink = () => {
    // Generate shared link logic here
return `https://localhost:3000/post/${post?._id}`;
  }
  const handleShare = (platform) => {
    const url=generateSharedLink();
    let shareUrl;
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${post?.content}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
        case "copy":
          navigator.clipboard.writeText(url);
          setIsShareDialogOpen(false);
          alert("Link copied to clipboard");
        return;
      default:
        shareUrl = url;
        return;
    }
    window.open(shareUrl, "_blank");//dusre tab par khule
    setIsShareDialogOpen(false);
  }
  return (
    <motion.div
      key={post?._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[rgb(36,37,38)] rounded-lg shadow-lg overflow-hidden mb-4"
    >
      <div>
        <div className="flex items-center justify-between mb-4 px-4 mt-2 ">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 rounded-full mr-3">
              <AvatarImage />
              <AvatarFallback className="dark:bg-gray-400">sg</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold dark:text-white">
                shambhuraj Gadhave
              </p>
            </div>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 ">
            <Clock className="h-4 w-4 mr-1" />
            <span>28-6-2025</span>
          </div>
        </div>
        <div className="relative aspect-video bg-black-50 mb-4">
          {post?.mediaUrl && (
            <video controls className="w-full h-[500px] rounded-lg mb-4">
              <source src={post?.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="md:flex justify-between px-2 items-center mb-2">
            <div className="flex space-x-4">

           
          <Button variant="ghost" className={`flex dark:hover:bg-gray-600 items-center`}>
            <ThumbsUp className="mr-2 h-4 w-4" />
            <span>like</span>
          </Button>
          <Button variant="ghost" className={`flex dark:hover:bg-gray-600`}>
            <ThumbsDown className="mr-2 h-4 w-4" />
            <span>like</span>
          </Button>
          <Button variant="ghost" className={`flex dark:hover:bg-gray-600`}>
            <MessageCircle className="mr-2 h-4 w-4" />
            <span>comment it!</span>
          </Button>
          <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className={`flex  items-center dark:hover:bg-gray-500`}
              >
                <Share2 className="mr-2 h-4 w-4" />
                <span>share</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share this Post</DialogTitle>
                <DialogDescription>
                  choose how you want to share the post
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-3 p-4 bg-muted/40 rounded-xl shadow-sm transition-all duration-300">
                <Button
                  variant="ghost"
                  className="flex items-center justify-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
                  onClick={() => handleShare("facebook")}
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-600">Facebook</span>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center justify-center gap-2 hover:bg-sky-100 dark:hover:bg-sky-950 transition-colors"
                  onClick={() => handleShare("twitter")}
                >
                  <Twitter className="h-5 w-5 text-sky-500" />
                  <span className="font-medium text-sky-500">Twitter</span>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center justify-center gap-2 hover:bg-pink-100 dark:hover:bg-pink-950 transition-colors"
                  onClick={() => handleShare("instagram")}
                >
                  <Instagram className="h-5 w-5 text-pink-500" />
                  <span className="font-medium text-pink-500">Instagram</span>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center justify-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
                  onClick={() => handleShare("linkedin")}
                >
                  <Linkedin className="h-5 w-5 text-blue-700" />
                  <span className="font-medium text-blue-700">LinkedIn</span>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => handleShare("copy")}
                >
                  <Copy className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="font-medium">Copy Link</span>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
           </div>
           <div className="flex space-x-4 ml-2 text-sm text-gray-500 dark:text-gray-400">
            <Button variant="ghost" size="sm">
              3 likes
            </Button>
            <Button variant="ghost" size="sm" onClick={()=>setShowComments(!showComments)}>
              3 comments
            </Button>
            <Button variant="ghost" size="sm">
              3 shares
            </Button>
           </div>
        </div>
    
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <VideoComments comments={post.comments} />
              </ScrollArea>
              <div className="flex items-center mt-4">
                <Avatar className="h-10 w-10 rounded-full mr-3">
              <AvatarImage />
              <AvatarFallback className="dark:bg-gray-400">sg</AvatarFallback>
            </Avatar>
            <Input className="flex-1 mr-2 dark:border-gray-400"
            />
            <Button>
              <Send className="h-4 w-4"/>
            </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
export default VideoCard;
