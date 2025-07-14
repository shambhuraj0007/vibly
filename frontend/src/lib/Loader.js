"use client";

import { motion } from "framer-motion";

export default function Loader() {
  const dotVariants = {
    hidden: { opacity: 0.3, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      scale: 1.3,
      transition: {
        delay: i * 0.2,
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.6,
        ease: "easeInOut",
      },
    }),
  };

  return (
<div
  className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 
    bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 
    dark:from-blue-300 dark:via-purple-200 dark:to-pink-200 
    text-white transition-all duration-1000 ease-in-out"
>

      
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center text-4xl sm:text-5xl font-extrabold tracking-wide drop-shadow-md"
      >
        <span className="text-red-400 animate-pulse">꧁𓊈𒆜</span>
        <span className="text-orange-400 text-5xl">🆅</span>
        <span className="text-orange-300">🅸</span>
        <span className="text-yellow-300">🅱</span>
        <span className="text-green-300">🅻</span>
        <span className="text-blue-300">🆈</span>
        <span className="text-red-400 animate-pulse">𒆜𓊉</span>
      </motion.div>

      {/* Bouncing Dots */}
      <div className="flex space-x-4">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white dark:bg-black shadow-lg"
            initial="hidden"
            animate="visible"
            custom={index}
            variants={dotVariants}
          />
        ))}
      </div>
    </div>
  );
}
