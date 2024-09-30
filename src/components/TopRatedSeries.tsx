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
import Link from "next/link";


interface Movie {
  id: number;
  name: string;
  genre_ids:[number];
  overview: string;
  vote_average:number;
  backdrop_path: string;
}

// NowPlaying component
const TopRatedSeries = () => {
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
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`,
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
     <h1 className=" font-bold text-2xl mb-3">Popular Series</h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        navigation
        slidesPerView={4}
        loop={true} // Enable infinite looping
        // autoplay={{
        //   delay: 3000, // Delay between slides in ms
        //   disableOnInteraction: false, // Continue autoplay after user interaction
        // }}
      >
        {nowPlaying?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/tv/${movie.id}`}>
            <div className="card w-full h-full group relative   ">
              {movie.backdrop_path && (
                <Image
                  src={`${baseUrl}${movie.backdrop_path}`}
                  alt={movie.name}
                  layout="responsive" // Fill the parent container
                  objectFit="cover"
                  width={1600}
                  height={900} // Maintain aspect ratio
                  className="w-full h-full border"
                />
              )}
              <div className=" info hidden group-hover:flex flex-col justify-center items-center absolute inset-0  w-full h-full z-50    gap-y-3 transition-all duration-300 ease-in bg-transparent ">
                 <button className="p-3 text-white bg-red-600 rounded-[50%]"><span><Play/></span></button>
                   <h1 className="text-lg font-bold text-white">{movie.name}</h1>
              </div>
            </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRatedSeries;
