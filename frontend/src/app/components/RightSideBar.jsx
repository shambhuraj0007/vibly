"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const RightSideBar = () => {
  const [showAllSponsers, setShowAllSponsors] = React.useState(false);
const sponsors = [
  {
    name: "Netflix",
    description: "The world’s leading streaming entertainment service.",
    image: "https://www.creatopy.com/blog/wp-content/uploads/2016/12/narcos-house-of-cards-banner-ads--600x508.png",
    website: "https://www.netflix.com",
  },
  {
    name: "Flipkart",
    description: "India’s favorite online shopping destination.",
    image: "https://th.bing.com/th/id/OIP.Uz5n2Tvkr_AbJWt1N_LOKgHaFp?w=230&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    website: "https://www.flipkart.com",
  },
  {
    name: "Dream11",
    description: "India’s #1 fantasy sports platform—play smarter, win bigger.",
    image: "https://th.bing.com/th/id/R.4679fe9db6dd2b85c07678aa73702748?rik=CIkRcbBbm3uZoA&riu=http%3a%2f%2fthesportzplanet.com%2fwp-content%2fuploads%2f2024%2f04%2fDream11-campaign-2024.jpg&ehk=0wLskZhzaN2hsSF6uQsnDfxzjdC%2fs1drqaCqQyhaGjY%3d&risl=&pid=ImgRaw&r=0",
    website: "https://www.dream11.com",
  },
  {
          name: "Instagram",
          description: "Explore the latest features and connect with friends.",
          image: "https://th.bing.com/th?q=Instagram+Logo+Add&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
          website: "https://www.instagram.com",
        },
   {
          name: "Spotify",
          description: "Stream your favorite music anytime, anywhere.",
          image: "https://th.bing.com/th/id/OIP.X8ahKP96ehArvpokH282lgAAAA?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
          website: "https://www.spotify.com",
        },
        {
          name: "Amazon",
          description: "Shop for everything you need with fast delivery.",
          image: "https://th.bing.com/th/id/OIP.33OhKb-WMxdpk2fxsVEOXAHaEH?w=335&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
          website: "https://www.amazon.com",
        },
        {
          name: "Apple",
          description: "Discover innovative products and services.",
          image: "https://c8.alamy.com/comp/R48PB8/ad-poster-for-the-new-apple-iphone-xs-in-the-london-underground-R48PB8.jpg",
          website: "https://www.apple.com",
        },
];

  const displaySponsors = showAllSponsers ? sponsors : sponsors.slice(0, 3);
  return (
    <motion.aside
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 "
    >
      <Card className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px]">

        <CardHeader>
          <CardTitle className="flex text-lg font-semibold items-center">
            <TrendingUp className="mr-2 h-5 w-10 text-primary" />
            our sponsers
          </CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {displaySponsors.map((sponser,index)=>(
                    <motion.li key={sponser.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay:index*0.1 }}
                    className="flex flex-col items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                            <img
                            src={sponser.image}
                            alt={sponser.name}
                            className="w-50 h-40 object-contain rounded-md"
                            />
                            <div className="flex-1">
                                <h3 className="text-md font-semibold">{sponser.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{sponser.description}</p>
                                <a href={sponser.website}
                                target="#"
                                className="text-primary text-sm flex items-center nt-1 hover:underLine">
                                    visit website<ExternalLink className="ml-1 h-4 w-4"/>
                                </a>

                                
                            </div>
                    </motion.li>
                ))}

            </ul>
            {sponsors.length > 3 && (

                <Button 
                variant="outline"
                className="w-full mt-4 dark:text-white"
                onClick={()=>setShowAllSponsors(!showAllSponsers)}
                    >{showAllSponsers ? "show less " :"show more" }
                </Button>
            )}
        </CardContent>
      </Card>
    </motion.aside>
  );
};
export default RightSideBar;
