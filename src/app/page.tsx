"use client";
import Navbar from "@/components/Navbar";
import NowPlaying from "@/components/NowPlaying";
import PopularMovies from "@/components/PopularMovies";
import PopularSeries from "@/components/PopularSeries";
import TopRatedMovies from "@/components/TopRatedMovies";
import TopRatedSeries from "@/components/TopRatedSeries";

export default function Home() {
  return (
    <div >
      <div className="container mx-auto">
        <NowPlaying />
        <PopularMovies />
        <PopularSeries />
        <TopRatedMovies />
        <TopRatedSeries />
      </div>
    </div>
  );
}
