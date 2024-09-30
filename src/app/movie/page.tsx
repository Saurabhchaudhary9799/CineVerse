"use client";
import TrendingMovies from "@/components/TrendingMovies";
import usePopularMovies from "@/hooks/usePopularMovies";
import useTopRatedMovies from "@/hooks/useTopRatedMovies";
import { Play } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const { popularMovies, loading: loadingPopular } = usePopularMovies(currentPage);
  const { topRatedMovies, loading: loadingTopRated } = useTopRatedMovies(currentPage); // Use currentPage for top rated too
  const [current, setCurrent] = useState("popular");

  const baseUrl = "https://image.tmdb.org/t/p/w1280";

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage); // Update the current page
  };

  return (
    <>
      <TrendingMovies />
      <section className="mb-3">
        <div className="flex justify-between mb-3">
          <div>
            <span className="text-2xl font-bold">Movies</span>
          </div>
          <div className="flex items-center gap-x-5 text-xl font-regular">
            <span
              onClick={() => {
                setCurrent("popular");
                setCurrentPage(1); // Reset to page 1
              }}
              className={`${
                current === "popular" && "bg-red-600 p-2 text-white rounded"
              } cursor-pointer`}
            >
              Popular
            </span>
            <span
              onClick={() => {
                setCurrent("top-rated");
                setCurrentPage(1); // Reset to page 1
              }}
              className={`${
                current === "top-rated" && "bg-red-600 p-2 text-white rounded"
              } cursor-pointer`}
            >
              Top Rated
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {loadingPopular || loadingTopRated ? (
            <p>Loading...</p>
          ) : current === "popular" ? (
            popularMovies?.map((movie) => (
              <div key={movie.id} className="card relative group">
                {movie.backdrop_path && (
                  <Image
                    src={`${baseUrl}${movie.backdrop_path}`}
                    alt={movie.original_title}
                    layout="responsive"
                    objectFit="cover"
                    width={1600}
                    height={900}
                    className="w-full h-full border"
                  />
                )}
                <div className="info hidden group-hover:flex flex-col justify-center items-center absolute inset-0 w-full h-full z-50 gap-y-3 transition-all duration-300 ease-in bg-black bg-opacity-50">
                  <button className="p-3 text-white bg-red-600 rounded-full">
                    <Play />
                  </button>
                  <h1 className="text-lg font-bold text-white">
                    {movie.original_title}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            topRatedMovies?.map((movie) => (
              <div key={movie.id} className="card relative group">
                {movie.backdrop_path && (
                  <Image
                    src={`${baseUrl}${movie.backdrop_path}`}
                    alt={movie.original_title}
                    layout="responsive"
                    objectFit="cover"
                    width={1600}
                    height={900}
                    className="w-full h-full border"
                  />
                )}
                <div className="info hidden group-hover:flex flex-col justify-center items-center absolute inset-0 w-full h-full z-50 gap-y-3 transition-all duration-300 ease-in bg-black bg-opacity-50">
                  <button className="p-3 text-white bg-red-600 rounded-full">
                    <Play />
                  </button>
                  <h1 className="text-lg font-bold text-white">
                    {movie.original_title}
                  </h1>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Pagination */}
      <div className="pagination">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)}  />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => handlePageChange(1)}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default Page;
