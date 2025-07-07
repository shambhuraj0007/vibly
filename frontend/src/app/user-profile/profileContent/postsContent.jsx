"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MessageCircleHeart,
  MoreHorizontal,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Copy,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PostComments from "@/app/posts/PostComments";

const PostsContent = ({ post }) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const generateSharedLink = () => {
    return `https://localhost:3000/post/${post?._id}`;
  };

  const handleShare = (platform) => {
    const url = generateSharedLink();
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

    window.open(shareUrl, "_blank");
    setIsShareDialogOpen(false);
  };

  return (
    <motion.div
      key={post?._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent className="p-6 dark:text-white">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center cursor-pointer space-x-3">
              <Avatar>
                <AvatarImage src={post?.userImage} />
                <AvatarFallback>RJ</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold dark:text-white">
                  {post?.userName || "shambhuraj gadhave"}
                </p>
                <p className="text-sm text-gray-500">{post?.date || "26-6-2025"}</p>
              </div>
            </div>
            <Button variant="ghost" className="dark:hover:bg-gray-500">
              <MoreHorizontal />
            </Button>
          </div>

          {/* Content */}
          <p className="mb-4">{post?.content}</p>

          {/* Media */}
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

          {/* Like & Comment Summary */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:underline">
              4 likes
            </span>
            <div className="flex gap-3 flex-wrap">
              <span
                className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:underline"
                onClick={() => setShowComments((prev) => !prev)}
              >
                {showComments ? "Hide comments" : "Show comments"}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:underline">
                6 share
              </span>
            </div>
          </div>

          <Separator className="mb-2 dark:bg-gray-400" />

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between gap-2 mb-2">
            <Button variant="ghost" className="flex-1 min-w-[120px] dark:hover:bg-gray-600">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button variant="ghost" className="flex-1 min-w-[120px] dark:hover:bg-gray-600">
              <ThumbsDown className="mr-2 h-4 w-4" />
              Dislike
            </Button>
            <Button variant="ghost" className="flex-1 min-w-[120px] dark:hover:bg-gray-600">
              <MessageCircleHeart className="mr-2 h-4 w-4" />
              Comment it!
            </Button>
            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex-1 min-w-[120px] dark:hover:bg-gray-500"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share this Post</DialogTitle>
                  <DialogDescription>
                    Choose how you want to share the post
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3 p-4 bg-muted/40 rounded-xl">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-950"
                    onClick={() => handleShare("facebook")}
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-600">Facebook</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 hover:bg-sky-100 dark:hover:bg-sky-950"
                    onClick={() => handleShare("twitter")}
                  >
                    <Twitter className="h-5 w-5 text-sky-500" />
                    <span className="font-medium text-sky-500">Twitter</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 hover:bg-pink-100 dark:hover:bg-pink-950"
                    onClick={() => handleShare("instagram")}
                  >
                    <Instagram className="h-5 w-5 text-pink-500" />
                    <span className="font-medium text-pink-500">Instagram</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-950"
                    onClick={() => handleShare("linkedin")}
                  >
                    <Linkedin className="h-5 w-5 text-blue-700" />
                    <span className="font-medium text-blue-700">LinkedIn</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleShare("copy")}
                  >
                    <Copy className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <span className="font-medium">Copy Link</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Separator className="mb-2 dark:bg-gray-400" />

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PostComments post={post} />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostsContent;
