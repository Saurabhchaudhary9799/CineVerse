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

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface VideosProps {
  movieId: number; // You need to pass movieId as a prop to this component
}

const Videos: React.FC<VideosProps> = ({ movieId }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Make sure to set your API key in .env
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
        );

        setVideos(response.data.results);
        setLoading(false); // Return the videos array
      } catch (error) {
        console.error("Error fetching movie videos:", error);
        setLoading(false);
      }
    };

    getVideos();
  }, [movieId]);

  if (loading) return <div>Loading videos...</div>;

  return (
    <div id="videos" className="mb-5">
      <h2 className="text-2xl font-bold mb-3">Videos</h2>
      <div className="video-list">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          // loop={true} // Enable infinite looping
          // autoplay={{
          //   delay: 3000, // Delay between slides in ms
          //   disableOnInteraction: false, // Continue autoplay after user interaction
          // }}
        >
          {videos?.map((video) => (
            <SwiperSlide key={video.id}>
              <div className="video-item bg-gray-100 rounded shadow relative ">
               
                <img
                  src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`} // Use maxresdefault.jpg for HD images
                  alt={`Thumbnail for ${video.name}`}
                  width={1600}
                  height={900}
                  className="mt-2 w-full rounded object-top"
                />
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <Link href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank">
                    <button className="bg-red-600 text-white p-4 rounded-full">
                      <Play />
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Videos;
