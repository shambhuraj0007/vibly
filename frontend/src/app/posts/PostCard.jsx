"use client";

import React, { useState, useRef, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  MessageCircleHeart,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Copy,
} from "lucide-react";
import PostComments from "./PostComments";
import userStore from "@/store/userStore";
import { formatDate } from "@/lib/Utils";
import { likePost } from "@/service/post.service";
import toast from "react-hot-toast";

const PostCard = ({ post, onComment }) => {
  const { user } = userStore();
  const [liked, setLiked] = useState(post?.liked || false);
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
  const [disliked, setDisliked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const commentInputRef = useRef(null);

  const userPostPlaceholder = useMemo(() => {
    return typeof user?.username === "string"
      ? user.username
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "?";
  }, [user?.username]);

  const generateShareLink = useCallback(() => {
    return `https://localhost:3000/post/${post?._id}`;
  }, [post?._id]);

  const handleShare = useCallback(
    (platform) => {
      const url = generateShareLink();
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
          toast.success("Link copied to clipboard");
          setIsShareDialogOpen(false);
          return;
        default:
          shareUrl = url;
      }

      window.open(shareUrl, "_blank");
      setIsShareDialogOpen(false);
    },
    [generateShareLink, post?.content]
  );

  const handleLikeClick = async () => {
    try {
      const data = await likePost(post._id);
      setLiked(data?.liked);
      setLikeCount(data?.likeCount);
      if (disliked && data?.liked) setDisliked(false); // Only one active
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  const handleDislikeClick = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      if (liked) {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    }
  };

  const handleCommentClick = () => {
    setShowComments(true);
    setTimeout(() => commentInputRef.current?.focus(), 0);
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <Avatar className="h-8 w-8">
                {post?.user?.profilePicture ? (
                  <AvatarImage
                    src={post.user.profilePicture}
                    alt={post.user.username}
                  />
                ) : (
                  <AvatarFallback>{userPostPlaceholder}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-semibold">{post?.user?.username}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(post?.createdAt)}
                </p>
              </div>
            </div>
            <Button variant="ghost">
              <MoreHorizontal />
            </Button>
          </div>

          <p className="mb-4">{post?.content}</p>

          {post?.mediaUrl && post.mediaType === "image" && (
            <img
              src={post.mediaUrl}
              alt="post"
              className="w-full h-auto rounded-lg mb-4"
            />
          )}
          {post?.mediaUrl && post.mediaType === "video" && (
            <video controls className="w-full h-[500px] rounded-lg mb-4">
              <source src={post.mediaUrl} type="video/mp4" />
            </video>
          )}

          <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
            <span>
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </span>
            <div className="flex gap-3">
              <span
                onClick={() => setShowComments((prev) => !prev)}
                className="cursor-pointer hover:underline"
              >
                {showComments ? "Hide comments" : "Show comments"}
              </span>
              <span>{post?.shareCount ?? 0} shares</span>
            </div>
          </div>

          <Separator className="mb-2" />

          <div className="flex justify-between mb-2">
            <Button
              variant="ghost"
              className={`flex items-center gap-2 dark:hover:bg-gray-700 ${
                liked ? "text-red-600" : ""
              }`}
              onClick={handleLikeClick}
            >
              <ThumbsUp className="h-4 w-4" /> Like
            </Button>

            <Button
              variant="ghost"
              className={`flex items-center gap-2 dark:hover:bg-gray-700 ${
                disliked ? "text-blue-600" : ""
              }`}
              onClick={handleDislikeClick}
            >
              <ThumbsDown className="h-4 w-4" /> Dislike
            </Button>

            <Button
              variant="ghost"
              className="flex items-center gap-2 dark:hover:bg-gray-700"
              onClick={handleCommentClick}
            >
              <MessageCircleHeart className="h-4 w-4" /> Comment
            </Button>

            <Dialog
              open={isShareDialogOpen}
              onOpenChange={setIsShareDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 dark:hover:bg-gray-700"
                >
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share this post</DialogTitle>
                  <DialogDescription>Select a platform:</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3 p-4 bg-muted/40 rounded-lg">
                  <Button
                    onClick={() => handleShare("facebook")}
                    variant="ghost"
                    className="gap-2"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" /> Facebook
                  </Button>
                  <Button
                    onClick={() => handleShare("twitter")}
                    variant="ghost"
                    className="gap-2"
                  >
                    <Twitter className="h-5 w-5 text-sky-500" /> Twitter
                  </Button>
                  <Button
                    onClick={() => handleShare("instagram")}
                    variant="ghost"
                    className="gap-2"
                  >
                    <Instagram className="h-5 w-5 text-pink-500" /> Instagram
                  </Button>
                  <Button
                    onClick={() => handleShare("linkedin")}
                    variant="ghost"
                    className="gap-2"
                  >
                    <Linkedin className="h-5 w-5 text-blue-800" /> LinkedIn
                  </Button>
                  <Button
                    onClick={() => handleShare("copy")}
                    variant="ghost"
                    className="gap-2"
                  >
                    <Copy className="h-5 w-5" /> Copy Link
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Separator className="mb-2" />

          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PostComments
                  post={post}
                  commentInputRef={commentInputRef}
                  onComment={onComment}
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
