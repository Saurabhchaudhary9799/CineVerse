"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useGenres from "@/hooks/useGenre";
import { Divide, Play } from "lucide-react";
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
import CircularProgressBar from "./CircularProgressBar";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  genres: {
    id: number;
    name: string;
  }[];
  poster_path: string;
  release_date: string;
  vote_average:number;
  [key: string]: any; // You can expand this based on what fields you want to display
}

interface MovieCast {
  id: string;
  name: string;
  profile_path: string;
}

interface ComponentProps {
  movieId: number;
}

const MovieIntro: React.FC<ComponentProps> = ({ movieId }) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null); // State for movie details
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading
  const [movieCast, setMovieCast] = useState<MovieCast[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        );
        setMovieCast(response.data.cast);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movieDetails) {
    return <div>Movie details not available</div>;
  }

  return (
    <>
      <div className="movie-intro flex mb-5">
        <div className="movie-poster w-2/6 ">
          {movieDetails.poster_path && (
            <img
              className="w-full h-full"
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              width={300}
            />
          )}
        </div>
        <div className="w-4/6  flex flex-col  gap-y-5 pl-10">
          <div>
            <h1 className="text-5xl font-bold">{movieDetails.title}</h1>
          </div>
          <div className="flex items-center gap-x-5">
          
<CircularProgressBar value={parseFloat((movieDetails.vote_average * 10).toFixed(1))} />

            

            <div className="flex gap-x-3">
              {movieDetails.genres?.map((genre, i) => (
                <span
                  key={genre.id}
                  className="bg-red-600 text-white px-2 py-1 rounded-3xl"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p>{movieDetails.overview}</p>
          </div>
          <div className="flex gap-x-5 items-center">
            <div>
              <span className="text-red-600 text-2xl"><CiHeart/></span>
            </div>
            <div>
              <Link href="#videos">
              <button className="bg-red-600 text-white flex justify-center items-center gap-x-2 px-2 py-2 rounded">
                {" "}
                <span>
                  <Play />
                </span>
                Watch Now
              </button>
              </Link>
            </div>
          </div>

          <div>
            <h1>Cast</h1>
            <div>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={10}
                slidesPerView={5}
                navigation
                // loop={true} // Enable infinite looping
                // autoplay={{
                //   delay: 3000, // Delay between slides in ms
                //   disableOnInteraction: false, // Continue autoplay after user interaction
                // }}
              >
                {movieCast?.map((cast) => (
                  <SwiperSlide key={cast.id}>
                    <div className="border relative">
                      {cast.profile_path && (
                        <>
                          <img
                            src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                            alt={cast.name}
                          />
                          <div className="absolute bottom-0 bg-red-600 text-center py-2 w-full">
                            <span>{cast.name}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div>
            <p>
              <span className="font-bold text-xl">Release Date - </span>{" "}
              {movieDetails.release_date}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieIntro;
