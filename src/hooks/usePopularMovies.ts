import { useEffect, useState } from 'react';
import fetchPopularMovies from '@/utils/getPopularMovies';

interface Movie {
  id: number;
  original_title: string;
  genre_ids: [number];
  overview: string;
  vote_average: number;
  backdrop_path: string;
  first_air_date: string;
}

const usePopularMovies = (page: number) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPopularMovies = async () => {
      setLoading(true);
      const fetchedMovies = await fetchPopularMovies(page); // Pass the page here
      setPopularMovies(fetchedMovies);
      setLoading(false);
    };

    getPopularMovies();
  }, [page]);

  return { popularMovies, loading };
};

export default usePopularMovies;
