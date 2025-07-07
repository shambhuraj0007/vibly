"use client";
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const PostComment = ({ post }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const commentsToShow = showAllComments ? post?.comments : post?.comments?.slice(0, 2);

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Comments</h3>
      <div className="max-h-60 overflow-y-auto pr-2">
         {(!commentsToShow || commentsToShow.length === 0) && (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">No comments yet.</p>
        )}
        {commentsToShow?.map((comment, index) => (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment?.user?.avatarUrl || ""} />
              <AvatarFallback className="dark:bg-gray-400">
                {comment?.user?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                <p className="font-bold text-sm">{comment?.user?.username}</p>
                <p className="text-sm">{comment?.user?.text}</p>
              </div>
              <div className="flex items-center mt-1 text-xs text-gray-500 space-x-2">
                <Button variant="ghost" size="sm">Like</Button>
                <Button variant="ghost" size="sm">Reply</Button>
                <span>{comment?.createdAt}</span>
              </div>
            </div>
          </div>
        ))}

        {post?.comments?.length > 2 && (
          <p
            className="w-fit cursor-pointer mt-2 flex items-center text-blue-500 dark:text-gray-300"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? (
              <>
                Show less <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostComment;
