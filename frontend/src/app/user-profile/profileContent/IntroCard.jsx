// IntroCard.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  Heart,
  MapPin,
  Briefcase,
  GraduationCap,
  Rss,
} from "lucide-react";

const IntroCard = ({ profile, onEditBio, isOwner }) => {
  return (
    <div className="w-full lg:w-[30%]">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">Intro</h2>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {profile?.bio?.bioText}
          </p>

          <div className="space-y-2 mb-4 dark:text-gray-300">
            <div className="flex items-center">
              <Home className="w-5 h-5 mr-2" />
              <span>{profile?.bio?.liveIn}</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              <span>{profile?.bio?.relationship}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{profile?.bio?.hometown}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              <span>{profile?.bio?.workplace}</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              <span>{profile?.bio?.education}</span>
            </div>
          </div>

          <div className="flex items-center mb-4 dark:text-gray-300">
            <Rss className="w-5 h-5 mr-2" />
            <span>Followed by {profile?.followingCount} people</span>
          </div>

          {isOwner && (
            <Button className="w-full" onClick={onEditBio}>
              Edit Bio
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IntroCard;
