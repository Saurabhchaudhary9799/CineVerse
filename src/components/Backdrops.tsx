"use client";

import React, { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import axios from "axios";
import Link from "next/link";
import { Play } from "lucide-react";

interface Backdrop {
  
  file_path:string;
}

interface BackdropProps {
  movieId: number; // You need to pass movieId as a prop to this component
}

const Backdrops: React.FC<BackdropProps> = ({ movieId }) => {
  const [backdrops, setBackdrops] = useState<Backdrop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBackdrops = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Make sure to set your API key in .env
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`
        );

        setBackdrops(response.data.backdrops);
        setLoading(false); // Return the videos array
      } catch (error) {
        console.error("Error fetching movie videos:", error);
        setLoading(false);
      }
    };

    getBackdrops();
  }, [movieId]);

  if (loading) return <div>Loading Backdrops...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold">BackDrops</h2>
      <div className="video-list">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          // loop={true} // Enable infinite looping
          // autoplay={{
          //   delay: 3000, // Delay between slides in ms
          //   disableOnInteraction: false, // Continue autoplay after user interaction
          // }}
        >
          {backdrops?.map((Backdrop,i) => (
            <SwiperSlide key={i}>
              <div className="video-item bg-gray-100 rounded shadow relative h-[600px]">
               
                
                <img
                  src={`https://image.tmdb.org/t/p/w500${Backdrop.file_path}`} // Use maxresdefault.jpg for HD images
                  alt={`${Backdrop.file_path}`}
                  width={1600}
                  height={900}
                  className="mt-2 w-full rounded object-top"
                />

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Backdrops;
