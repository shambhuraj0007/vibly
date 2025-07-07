import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';

const VideoComments = ({comments}) => {
  return (
    <>
    {comments.map((comment,index) => (
      <div className="flex items-start space-x-2 mb-4">
        <Avatar className="h-8 w-8">
              <AvatarImage />
              <AvatarFallback className="dark:bg-gray-400">sg</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                <p className="font-semibold text-sm">{comment?.user?.username}</p>
                <p className="text-sm">{comment?.user?.text}</p>
              </div>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <Button variant="ghost" size="sm"> like
                </Button>
                <Button variant="ghost" size="sm"> reply
                </Button>
                <span>{comment.createAt}</span>
              </div>
            </div>
      </div>
      ))}
    </>
  )
}

export default VideoComments;
