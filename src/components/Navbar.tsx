"use client";
import { Moon, Search, Sun } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: string;
}

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${value}`
        );
        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Error fetching data from TMDB:", error);
      }
    } else {
      setSearchResults([]); // Clear results when the search bar is empty
    }
  };

  return (
    <header className="nav-bar flex justify-between items-center mb-5">
      <div>
        <Link href="/">
          <span className="text-2xl">CineVerse</span>
        </Link>
      </div>
      <div className="flex gap-x-10 items-center">
        <div className="flex items-center gap-x-5">
          <ul className="nav-list flex items-center gap-x-5">
            <Link href="/">
              <li className="nav-list-item relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full">
                Home
              </li>
            </Link>
            <Link href="/movie">
              <li className="nav-list-item relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full">
                Movie
              </li>
            </Link>
            <Link href="/tv">
              <li className="nav-list-item relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full">
                TV
              </li>
            </Link>
          </ul>

          {/* Search input */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className={`transition-all duration-300 ease-in-out ${
                isSearchOpen
                  ? "w-64 opacity-100 visible"
                  : "w-0 opacity-0 invisible"
              } h-10 px-4 rounded bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none`}
              placeholder="Search..."
            />
            {/* Search Icon */}
            <div
              className="nav-list-item w-6 h-6 ml-2 cursor-pointer"
              onClick={toggleSearch}
            >
              <Search />
            </div>
          </div>

          {/* Search results */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-14 right-0 w-64 bg-white dark:bg-gray-800 rounded shadow-lg p-4 max-h-[500px] overflow-y-auto z-50">
              {searchResults.map((result) => (
                
                <div key={result.id} className="py-2 border-b border-gray-200">
                  <Link href={`${result.title ? `/movie/${result.id}`:`/tv/${result.id}`}`}>
                  <p className="text-gray-900 dark:text-white">
                    {result.title || result.name} ({result.media_type})
                  </p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center">
          <div>
            <span
              className={`border-r-2 ${
                isDarkMode ? "border-gray-200" : "border-black"
              } pr-1`}
            >
              Login
            </span>
          </div>
          <div>
            <span className="pl-1">Signup</span>
          </div>
        </div>
        <div onClick={toggleDarkMode} className="transition-all cursor-pointer">
          <span>{isDarkMode ? <Sun /> : <Moon />}</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
