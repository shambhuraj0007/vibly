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
import userStore from "@/store/userStore";


const LeftSideBar = () => {
  const {isSidebarOpen,toggleSidebar}=useSidebarStore();
  const {user,clearUser} =userStore();
  const router = useRouter();

  
  const userPlaceholder = typeof user?.username === "string"
  ? user.username.split(" ").map((n) => n[0]).join("").toUpperCase()
  : "?";
  
    const handleNavigation = (path,item) => {
        router.push(path);
        if (isSidebarOpen) {
            toggleSidebar();
        }
    }


  

  return (
    <aside className={`fixed top-16 left-0 h-full w-64 p-4 transform transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0  ${isSidebarOpen ? "translate-x-0 bg-white dark:bg-[rgb(36,37,38)] shadow-lg" : "-translate-x-full"} ${isSidebarOpen ? "md:hidden" :""} md:bg-transparent md:shadow-none`}>
      <div className="flex flex-col h-full overflow-y-auto p-4 bg-white/70 dark:bg-[#232946cc] backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-transparent bg-clip-padding border-gradient-to-br from-primary/40 to-secondary/40">
        {/* Profile Section */}
        <div className="flex items-center space-x-2 mb-3 cursor-pointer">
          <Avatar>
                          {user?.profilePicture ? (
                                     <AvatarImage src={user?.profilePicture} alt={user?.username} />
                                   ):(
                             <AvatarFallback >
                               {userPlaceholder}
                               </AvatarFallback>
                              )}           
                         </Avatar>
          <span className="font-semibold text-lg text-primary drop-shadow">{user?.username}</span>
        </div>

        {/* Navigation Buttons */}
        <nav className="space-y-2 flex-grow mt-4">
          <Button variant="ghost" 
            className="w-full justify-start cursor-pointer transition-all duration-150 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:text-primary/90 text-base font-semibold"
            onClick={()=>handleNavigation('/')}
          >
            <Home className="mr-4" /> Home
          </Button>
          <Button variant="ghost" className="w-full justify-start cursor-pointer transition-all duration-150 rounded-xl hover:bg-gradient-to-r hover:from-secondary/10 hover:to-primary/10 hover:text-secondary/90 text-base font-semibold"
            onClick={()=>handleNavigation('/friends-list/')}
          >
            <Users className="mr-4" /> Friends
          </Button>
          <Button variant="ghost" className="w-full justify-start cursor-pointer transition-all duration-150 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:text-primary/90 text-base font-semibold"
            onClick={()=>handleNavigation('/video-feed')}
          >
            <Video className="mr-4" /> Video
          </Button>
          <Button variant="ghost" className="w-full justify-start  cursor-pointer transition-all duration-150 rounded-xl hover:bg-gradient-to-r hover:from-secondary/10 hover:to-primary/10 hover:text-secondary/90 text-base font-semibold"
            onClick={()=>handleNavigation(`/user-profile/${user._id}`)}
          >
            <User className="mr-4" /> Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start cursor-pointer transition-all duration-150 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:text-primary/90 text-base font-semibold">
            <MessageCircle className="mr-4" /> Messages
          </Button>
          <Button variant="ghost" className="w-full justify-start cursor-pointer transition-all duration-150 rounded-xl hover:bg-gradient-to-r hover:from-secondary/10 hover:to-primary/10 hover:text-secondary/90 text-base font-semibold">
            <Bell className="mr-4" /> Notification
          </Button>
        </nav>

        {/* Footer Section */}
        <div className="mb-16 mt-8">
          <Separator className="my-4" />
          <div className="flex items-center space-x-2 mb-2 cursor-pointer">
            <Avatar>
                            {user?.profilePicture ? (
                                       <AvatarImage src={user?.profilePicture} alt={user?.username} />
                                     ):(
                               <AvatarFallback >
                                 {userPlaceholder}
                                 </AvatarFallback>
                                )}           
                           </Avatar>
            <span className="text-sm font-semibold text-primary/80">{user?.username}</span>
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
