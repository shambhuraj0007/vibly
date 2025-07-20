"use client";
import React, { useEffect, useRef, useState } from "react";
import StoryCard from "./StoryCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { usePostStore } from "@/store/usePostStore";

const StorySection = () => {
  const [scrollPosition, setScrollPosition] = useState(0); // current scroll position
  const [maxScroll, setMaxScroll] = useState(0); // max scrollable distance
  const containerRef = useRef(); // ref for the scrollable container
  const {story,fetchStoryPost}=usePostStore();

useEffect(() => {
  fetchStoryPost();
}, [fetchStoryPost]);


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
  }, [story]);

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
        className="flex space-x-2 overflow-x-auto scrollbar-hide py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <motion.div
          className="flex space-x-2"
          drag="x"
          dragConstraints={{
            right: 0,
            left: -((story.length + 1) * 200) +
              (containerRef.current?.offsetWidth || 0),
          }}
        >
          <StoryCard isAddStory={true} />
          {story.map((story) => (
            <StoryCard story={story} key={story._id} />
          ))}
        </motion.div>
      </div>

      {/* Left arrow */}
      {scrollPosition > 0 && (
        <Button
  variant="outline"
  size="icon"
  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full shadow-lg"
  onClick={() => scroll("left")}
>
  <ChevronRight className="h-4 w-4 rotate-180" />
</Button>

      )}

      {/* Right arrow */}
    
    </div>
  );
};

export default StorySection;