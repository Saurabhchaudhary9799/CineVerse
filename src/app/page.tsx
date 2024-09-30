"use client";
import Navbar from "@/components/Navbar";
import NowPlaying from "@/components/NowPlaying";
import PopularMovies from "@/components/PopularMovies";
import PopularSeries from "@/components/PopularSeries";
import TopRatedMovies from "@/components/TopRatedMovies";
import TopRatedSeries from "@/components/TopRatedSeries";
import UpcomingMovies from "@/components/Upcoming";

export default function Home() {
  return (
    <div >
      <div className="container mx-auto">
        
        <NowPlaying />
        <UpcomingMovies/>
        <PopularMovies />
        <PopularSeries />
        <TopRatedMovies />
        <TopRatedSeries />
      </div>
    </div>
  );
}
