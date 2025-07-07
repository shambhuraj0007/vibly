import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const StoryCard = ({isAddStory,story}) => {
    const handleStoryClick=()=>{
        setFilePreview(story?.mediaUrl)
     setFileType(story?.mediaType)
     setIsNewStory(false)
     setShowPreview(true)
    }
  return (
    <>
    <Card className="w-40 h-60 relative overflow-hidden group cursor-pointer"
    onClick={isAddStory ? undefined:handleStoryClick}
    >
    <CardContent className="p-0 h-full">
        {isAddStory ?(
            <div className='w-full h-full flex flex-col'>
                <div className='h-7/8 w-full relative border-b'>
             <Avatar>
                          <AvatarImage />
                          <AvatarFallback>RJ</AvatarFallback>
                        </Avatar>
                </div>
                <div className='h-1/4 w-full flex flex-col items-center justify-center'>
                <br />
                <Button className="p-0 h-8 w-8 m- rounded-full bg-orange-400 hover:bg-orange-700"
                >
                    <Plus className='h-10 w-5 text-white'/>
                </Button>
                <p className='text-xs font-semibold mt-1'>ADD story</p>
                </div>
                <input
                type="file" accept='image/*,video/*'
                className='hidden'
                />
            </div>
        ):(<>
        {story?.mediaType==="image" ? (
            <img src={story?.mediaUrl} alt={story.user.username} className="w-full h-full object-cover" />
        ):(
            <video src={story?.mediaUrl} alt={story.user.username} className="w-full h-full object-cover" />
        )}
        <div className="absolute top-2 left-2 ring-2 ring-orange-500 rounded-full">
         <Avatar>
                          <AvatarImage />
                          <AvatarFallback>RJ</AvatarFallback>
                        </Avatar>
        </div>
        <div className='absolute bottom-2 left-2 right-2 '>
            <p className="text-white text-xs font-semibold truncate">shambhuraj</p>
        </div>
        </>
    )}


    </CardContent>
    </Card>
    </>
  )
}

export default StoryCard;