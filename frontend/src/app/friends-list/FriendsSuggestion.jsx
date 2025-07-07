"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export const FriendsSuggestion = ({ friend }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-xl flex flex-col items-center text-center"
      >
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={friend.image} alt={friend.name} />
          <AvatarFallback>{friend.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <h3 className="text-lg font-semibold dark:text-white mb-4">
          {friend.name}
        </h3>

        <div className="flex flex-col w-full space-y-2">
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            size="lg"
            onClick={() => {
            }}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Add Friend
          </Button>
          <Button className="text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            variant="outline"
            size="lg"
            onClick={() => {
            
            }}
          >
            <XCircle className="mr-2 h-4 w-4 text-red-400" /> Ignore
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
