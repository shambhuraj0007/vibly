"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Home,
  LogOut,
  MessageCircle,
  User,
  Users,
  Video,
} from "lucide-react";
import React from "react";
import useSidebarStore from "@/store/sidebarStore";
import { useRouter } from 'next/navigation';

const LeftSideBar = () => {
  const {isSidebarOpen,toggleSidebar}=useSidebarStore();
  const router = useRouter();
  
    const handleNavigation = (path,item) => {
        router.push(path);
    }
  

  return (
    <aside className={`fixed top-16 left-0 h-full w-64 p-4 transform transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0  ${isSidebarOpen ? "translate-x-0 bg-white dark:bg-[rgb(36,37,38)] shadow-lg" : "-translate-x-full"} ${isSidebarOpen ? "md:hidden" :""} md:bg-transparent md:shadow-none`}>
      <div className="flex flex-col h-full overflow-y-auto p-4">
        {/* Profile Section */}
        <div className="flex items-center space-x-2 mb-3 cursor-pointer">
          <Avatar className="h-10 w-10">
            <AvatarImage />
            <AvatarFallback>SG</AvatarFallback>
          </Avatar>
          <span className="font-semibold">Shambhuraj Gadhave</span>
        </div>

        {/* Navigation Buttons */}
        <nav className="space-y-1 flex-grow">
          <Button variant="ghost" 
          className="w-full justify-start cursor-pointer"
          onClick={()=>handleNavigation('/')}>
            <Home className="mr-4" /> Home
          </Button>
          <Button variant="ghost" className="w-full justify-start cursor-pointer"
          onClick={()=>handleNavigation('/friends-list')}>
            <Users className="mr-4" /> Friends
          </Button>
          <Button variant="ghost" className="w-full justify-start cursor-pointer"
          onClick={()=>handleNavigation('/video-feed')}>
            <Video className="mr-4" /> Video
          </Button>
          <Button variant="ghost" className="w-full justify-start  cursor-pointer"
          onClick={()=>handleNavigation('/user-profile')}>
            <User className="mr-4" /> Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start cursor-pointer">
            <MessageCircle className="mr-4" /> Messages
          </Button>
          <Button variant="ghost" className="w-full justify-start cursor-pointer">
            <Bell className="mr-4" /> Notification
          </Button>
        </nav>

        {/* Footer Section */}
        <div className="mb-16">
          <Separator className="my-4" />
          <div className="flex items-center space-x-2 mb-2 cursor-pointer">
            <Avatar className="w-10 h-10">
              <AvatarImage />
              <AvatarFallback>SG</AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold">Shambhuraj Gadhave</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>shambhuraj@007</p>
            <p>Terms of service 2025 June 22</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
