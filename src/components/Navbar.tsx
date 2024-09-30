"use client";
import { Moon, Search, Sun } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };
  return (
    <header className="nav-bar flex justify-between items-center mb-5">
      <div>
        <Link href="/">
        <span className="text-2xl">CineVerse</span></Link>
      </div>
      <div className="flex gap-x-10">
        <div>
          <ul className="nav-list flex gap-x-5">
            <Link href="/">
            <li className='nav-list-item relative after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full'>
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
            <Link href="/people">
            <li className="nav-list-item relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full">
              People
            </li>
            </Link>
            <li className="nav-list-item w-6 h-6 ">
              <Search />
            </li>
          </ul>
        </div>
        <div className="flex ">
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
        <div onClick={toggleDarkMode} className="transition-all">
          <span>{isDarkMode ? <Sun /> : <Moon />}</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
