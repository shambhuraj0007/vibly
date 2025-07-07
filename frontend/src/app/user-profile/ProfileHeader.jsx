"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, PenLine, Save, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfileHeader = () => {
    const [isEditProfileModel, setIsEditProfileModel] = useState(false);
      const [isEditCoverModel, setIsEditCoverModel] = useState(false);
      const coverImageInputRef = useRef(null);
    const [coverPhotoFile, setCoverPhotoFile] = useState(null);
    const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);

  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  return (
    <div className="relative">
     <div className="relative h-64 md:h-80 bg-gray-300 overflow-hidden">
  <img
    src={coverPhotoPreview || "/default-cover.jpg"}
    alt="cover"
    className="w-full h-full object-cover pointer-events-none"
  />

  <Button
    className="absolute bottom-4 right-4 flex items-center z-50 cursor-pointer"
    variant="secondary"
    size="sm"
    onClick={() => setIsEditCoverModel(true)}
  >
    <Camera className="mr-2 h-4 w-4" />
    <span className="hidden md:block">Edit Cover Photo</span>
  </Button>
</div>

        
      {/* Profile section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-5 ">
          <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-700">
            <AvatarImage
            />
            <AvatarFallback className="dark:bg-gray-400">
              SG
            </AvatarFallback>
          </Avatar>
          <div className="mt-4 mdLmt-0 text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold">shambhburaj gadhave</h1>
            <p className="text-gray-400 font-semibold">
              3.5k friends
            </p>
          </div>
           <Button
  className="mt-4 md:mt-0 cursor-pointer"
  onClick={() => setIsEditProfileModel(true)}
>
  <PenLine className="w-4 h-4 mr-2" />
  Edit Profile
</Button>


        </div>
      </div>
       {/* Edit profile modal */}
      <AnimatePresence>
        {isEditProfileModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className=" bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Edit Profile
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditProfileModel(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <form className="space-y-4" >
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 mb-2">
                    <AvatarImage
                    />
                    <AvatarFallback className="dark:bg-gray-400">
                     SG
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Profile Picture
                  </Button>
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" type="date" />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-400 text-white">
                  <Save className="w-4 h-4 mr-2" />
                 Save changes
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditCoverModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className=" bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Edit Cover Photo
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditCoverModel(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <form className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                  {coverPhotoPreview && (
                        <img
                            src={coverPhotoPreview || "/"}
                            alt="cover-photo"
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        )}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden cursor-pointer"
                    
                  />
                  <Button
                    type="button"
                    className={`cursor-pointer`}
                    variant="outline"
                    size="sm"
                    onClick={() => coverImageInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Select New Cover Photo
                  </Button>
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-400 text-white"
                  type="button"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Cover Photo
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
       

export default ProfileHeader;
