"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserMinus, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const FriendRequest = ({ friend }) => {
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
            className="bg-pink-400 text-white hover:bg-pink-600"
            size="lg"
            onClick={() => {
              // handle confirm logic
              console.log("Confirmed", friend.name);
            }}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Confirm
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              // handle delete logic
              console.log("Deleted", friend.name);
            }}
          >
            <UserMinus className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FriendRequest;
