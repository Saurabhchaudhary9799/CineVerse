import { useEffect, useState } from 'react';
import fetchTopRatedMovies from '@/utils/getTopRatedMovies';

interface Movie {
  id: number;
  original_title: string;
  genre_ids: [number];
  overview: string;
  vote_average: number;
  backdrop_path: string;
  first_air_date: string;
}

const useTopRatedMovies = (page: number) => {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopRatedMovies = async () => {
      setLoading(true);
      const fetchedMovies = await fetchTopRatedMovies(page); // Pass the page here
      setTopRatedMovies(fetchedMovies);
      setLoading(false);
    };

    getTopRatedMovies();
  }, [page]);

  return { topRatedMovies, loading };
};

export default useTopRatedMovies;
