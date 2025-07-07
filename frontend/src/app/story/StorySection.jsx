"use client";
import React, { useEffect, useRef, useState } from "react";
import StoryCard from "./StoryCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const StorySection = () => {
  const [scrollPosition, setScrollPosition] = useState(0); // current scroll position
  const [maxScroll, setMaxScroll] = useState(0); // max scrollable distance
  const containerRef = useRef(); // ref for the scrollable container

  const storyPosts = [
    {
    _id: 1,
    mediaUrl: "https://images.unsplash.com/photo-1517816428104-098fbdc86f3e", // sunset beach image
    mediaType: "image",
    user: {
      username: "shambhuraj",
    },
  },
      {
    _id: 2,
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // sample video
    mediaType: "video",
    user: {
      username: "shambhuraj",
    },
  },
  {
    _id: 3,
    mediaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // mountain image
    mediaType: "image",
    user: {
      username: "shambhuraj",
    },
  },
  
    

  ];

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const updateMaxScroll = () => {
        setMaxScroll(container.scrollWidth - container.offsetWidth);
        setScrollPosition(container.scrollLeft);
      };

      updateMaxScroll();
      window.addEventListener("resize", updateMaxScroll);

      return () => window.removeEventListener("resize", updateMaxScroll);
    }
  }, [storyPosts]);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -250 : 250;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      setScrollPosition(container.scrollLeft);
    }
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex space-x-2 overflow-x-hidden py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <motion.div
          className="flex space-x-2"
          drag="x"
          dragConstraints={{
            right: 0,
            left: -((storyPosts.length + 1) * 200) +
              (containerRef.current?.offsetWidth || 0),
          }}
        >
          <StoryCard isAddStory={true} />
          {storyPosts.map((story) => (
            <StoryCard story={story} key={story._id} />
          ))}
        </motion.div>
      </div>

      {/* Left arrow */}
      {scrollPosition > 0 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4 rotate-180" />
        </Button>
      )}

      {/* Right arrow */}
      {scrollPosition < maxScroll && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
          onClick={() => scroll("right")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default StorySection;
