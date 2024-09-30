"use client"
import axios from "axios";
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
import Image from "next/image";
import useGenres from "@/hooks/useGenre";
import { Pause, Play } from "lucide-react";


interface Movie {
  id: number;
  
  original_title:string;
  media_type:string;
  genre_ids:[number];
  overview: string;
  vote_average:number;
  backdrop_path: string;
}

// NowPlaying component
const TrendingMovies = () => {
    const { genres } = useGenres();
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
// console.log("genre",genres)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data);
        setNowPlaying(response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const baseUrl = "https://image.tmdb.org/t/p/w1280";
  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean) // Filter out any undefined values
      .join(", "); // Join the genre names into a single string
  };

  return (
    <div className="mb-5">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true} // Enable infinite looping
        autoplay={{
          delay: 3000, // Delay between slides in ms
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
      >
        {nowPlaying?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-[500px]">
              {movie.backdrop_path && (
                <Image
                  src={`${baseUrl}${movie.backdrop_path}`}
                  alt={movie.original_title}
                  layout="responsive" // Fill the parent container
                  objectFit="cover"
                  width={1600}
                  height={900} // Maintain aspect ratio
                  className="w-full h-full "
                />
              )}
              <div className="absolute inset-0  w-full h-full z-10 flex flex-col gap-y-5 items-start justify-center pl-16">
                <div>
                  <h1 className="text-white text-[50px] font-bold ">
                    {movie.original_title}
                  </h1>
                </div>
                <div className="flex items-center gap-x-5">
                  <span className="border-4 border-white rounded-full p-2 text-white">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  
                  <div className="flex gap-x-3">
                    {getGenreNames(movie.genre_ids).split(", ").map((genre, index) => (
                      <span key={index} className="bg-red-600 text-white px-2 py-1 rounded-2xl">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="w-96 text-white font-regular">
                    {movie.overview.length > 99
                      ? `${movie.overview.slice(0, 99)}...`
                      : movie.overview}
                  </p>
                </div>
                <div>
                  <button className="py-2 px-4 bg-red-600 text-white flex items-center gap-x-2 rounded">
                    <span><Play/></span>Watch Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingMovies;
