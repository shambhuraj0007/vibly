import React, { useMemo, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X, Trash2 } from "lucide-react";
import userStore from "@/store/userStore";

const ShowStoryPreview = ({
  file,
  fileType,
  onClose,
  onPost,
  onDelete, // not used currently, can be removed
  storyId,
  isNewStory,
  username,
  avatar,
  isLoading,
}) => {
  const { user } = userStore();

  const userPlaceholder = useMemo(() => {
    return username?.split(" ").map((name) => name[0]).join("") ?? "";
  }, [username]);

  const handleDeleteStory = useCallback(async () => {
    try {
      await axios.delete(`http://localhost:8080/api/stories/${storyId}`);
      toast.success("Story deleted successfully.");
      onClose();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete story.");
    }
  }, [storyId, onClose]);

  return (
    <div className="fixed inset-0 z-50  bg-black/60 w-full h-full flex justify-center">
      <div className="relative w-full max-w-md h-[80vh] flex flex-col bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        
        {/* Close Button */}
        <Button
          className="absolute top-4 right-4 z-10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          variant="ghost"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* User Info */}
        <div className="absolute top-4 left-4 z-10 flex items-center">
          <Avatar className="w-10 h-10 mr-2">
            {avatar ? (
              <AvatarImage src={avatar} alt={username} />
            ) : (
              <AvatarFallback>{userPlaceholder}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-gray-700 dark:text-gray-200 font-semibold">
            {username}
          </span>
        </div>

        {/* Preview */}
        <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          {fileType === "image" ? (
            <img
              src={file}
              alt="story_preview"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <video
              src={file}
              controls
              autoPlay
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>

        {/* Bottom Buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center px-4">
          {/* Delete (Only if not new and user's own story) */}
          {!isNewStory && username === user?.username && (
            <Button
              onClick={handleDeleteStory}
              variant="destructive"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          )}

          {/* Post (Only if new story) */}
          {isNewStory && (
            <Button
              onClick={onPost}
              className="bg-orange-400 hover:bg-orange-500 text-white "
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowStoryPreview;