import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, MoreHorizontal, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import  PostComments  from "./PostComments";
import { MessageCircleHeart } from 'lucide-react';
import {
  Dialog,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useState} from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Copy,
} from "lucide-react"; 



const PostCard = ({ post }) => {
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
    >
      <Card>
        <CardContent className="p-6 dark:text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center cursor-pointer space-x-3">
              <Avatar>
                <AvatarImage src={post?.userImage} />
                <AvatarFallback>RJ</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold dark:text-white">{post?.userName || "shambhuraj gadhave"}</p>
                <p className="text-sm text-gray-500">{post?.date || "26-6-2025"}</p>
              </div>
            </div>
            <Button variant="ghost" className="dark:hover:bg-gray-500">
              <MoreHorizontal />
            </Button>
          </div>
          <p className="mb-4">{post?.content}</p>
          {post?.mediaUrl && post.mediaType === "image" && (
            <img
              src={post?.mediaUrl}
              alt="post_image"
              className="w-full h-auto rounded-lg mb-4"
            />
          )}
          {post?.mediaUrl && post.mediaType === "video" && (
            <video controls className="w-full h-[500px] rounded-lg mb-4">
              <source src={post?.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 hover:border-b-1 border-gray-400 cursor-pointer">4 likes</span>
          <div className="flex gap-3">
           <span
              className="text-sm text-gray-500 dark:text-gray-400 hover:border-b-1 border-gray-400 cursor-pointer"
              onClick={() => setShowComments(prev => !prev)}
>
  {showComments ? "Hide comments" : "Show comments"}
</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 hover:border-b-1 border-gray-400 cursor-pointer">6 share</span>
          </div>
          </div>
          <Separator className="mb-2 dark:bg-gray-400"/>
          <div className="flex justify-between mb-2">
            <Button variant="ghost" className={`flex dark:hover:bg-gray-600`}>
              <ThumbsUp className="mr-2 h-4 w-4"/>
              like
            </Button>
            <Button variant="ghost" className={`flex-1 dark:hover:bg-gray-600`}>
              <ThumbsDown className="mr-2 h-4 w-4"/>
              dislike
            </Button>
            <Button variant="ghost" className={`flex-1 dark:hover:bg-gray-600`}>
              <MessageCircleHeart className="mr-2 h-4 w-4"/>
              comment it!
            </Button>
            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className={`flex-1 dark:hover:bg-gray-500`}>
                  <Share2 className="mr-2 h-4 w-4"/>
                  share
                </Button>
              </DialogTrigger>
              <DialogContent>
              <DialogHeader>
              <DialogTitle>Share this Post</DialogTitle>
              <DialogDescription>choose how you want to share the post</DialogDescription> 
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
          <Separator className="mb-2 dark:bg-gray-400"/>
          <AnimatePresence>
            {showComments && (
              <motion.div
               initial={{opacity:0,height:0}}
                animate={{opacity:1,height:"auto"}}
                exit={{opacity:0,height:0}}
                transition={{ duration: 0.5 }}
              >
                <PostComments
                post={post}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostCard;
