"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  Bell,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Sun,
  Users,
  Video,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import useSidebarStore from "@/store/sidebarStore";
import { useRouter } from "next/navigation";
import userStore from "@/store/userStore";
import { logout } from "@/service/auth.service"; // Assuming you have a logout function in your auth serviceUser

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const { user, clearUser } = userStore();

  const userPlaceholder =
    typeof user?.username === "string"
      ? user.username
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "?";

  const handleNavigation = (path, item) => {
    router.push(path);
  };
  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result?.status == "success") {
        router.push("/user-login");
        clearUser();
      }
      toast.success("user logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("failed to log out");
    }
  };
  return (
    <header className="bg-white dark:bg-[rgb(36,37,38)] text-foreground shadow-md h-16 fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex justify-between items-center p-2 cursor-pointer">
        {/* Logo and Search */}
        <div className="flex items-center gap-2 md:gap-4">
          <Image
            src="/images/sss.png"
            alt="app Logo"
            width={50}
            height={50}
            onClick={() => handleNavigation("/")}
          />
          <div className="relative">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-8 w-40 md:w-64 h-10 bg-gray-100 dark:bg-[rgb(58,59,60)] rounded-full"
                  placeholder="Search..."
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                />
              </div>
              {isSearchOpen && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1 z-50">
                  <div className="p-2">
                    <div className="flex items-center space-x-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                      <Search className="text-sm text-gray-400" />
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          {user?.profilePicture ? (
                            <AvatarImage
                              src={user?.profilePicture}
                              alt={user?.username}
                            />
                          ) : (
                            <AvatarFallback>{userPlaceholder}</AvatarFallback>
                          )}
                        </Avatar>
                        <span>{user?.username}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="hidden md:flex justify-around w-[40%] max-w-md">
          {[
            { icon: Home, path: "/", name: "home" },
            { icon: Video, path: "/video-feed", name: "video" },
            { icon: Users, path: "/friends-list", name: "friends" },
          ].map(({ icon: Icon, path, name }) => (
            <Button
              key={name}
              variant="ghost"
              className="relative text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-transparent"
              size="icon"
              onClick={() => handleNavigation(path)}
            >
              <Icon />
            </Button>
          ))}
        </nav>
        {/* User Profile menu*/}
        <div className="flex space-x-2 md:space-x-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-600 dark:text-gray-600 cursor-pointer pl-1"
            onClick={toggleSidebar}
          >
            <Menu />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:block text-gray-600 dark:text-gray-600 cursor-pointer pl-1"
          >
            <Bell />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:block text-gray-600 dark:text-gray-600 cursor-pointer pl-1  "
          >
            <MessageCircle />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar>
                  {user?.profilePicture ? (
                    <AvatarImage
                      src={user?.profilePicture}
                      alt={user?.username}
                    />
                  ) : (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 z-50" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <div children="flex items-center">
                    <Avatar>
                      {user?.profilePicture ? (
                        <AvatarImage
                          src={user?.profilePicture}
                          alt={user?.username}
                        />
                      ) : (
                        <AvatarFallback>{userPlaceholder}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="">
                      <p className="text-sm font-medium leading-none">
                        {user?.username}
                      </p>
                      <p className="text-xs mt-2 text-gray-600 leading-none">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={`cursor-pointer`}
                onClick={() => handleNavigation(`/user-profile/${user._id}`)}
              >
                <Users /> <span className="ml-2">Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem className={`cursor-pointer`}>
                <MessageCircle /> <span className="ml-2">Messages</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
              className={`cursor-pointer`}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <>
                    <Moon className="ml-2" />
                    <span>dark mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="ml-2" />
                    <span>light mode</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`cursor-pointer`}
                onClick={handleLogout}
              >
                <LogOut /> <span className="ml-2">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;