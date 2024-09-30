import { useEffect, useState } from 'react';

import fetchPopularSeries from '@/utils/getPopularSeries';

interface Movie {
  id: number;
  original_name: string;
  genre_ids: [number];
  overview: string;
  vote_average: number;
  backdrop_path: string;
  first_air_date: string;
}

const usePopularSeries = (page: number) => {
  const [popularSeries, setPopularSeries] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPopularSeries = async () => {
      setLoading(true);
      const fetchedMovies = await fetchPopularSeries(page); // Pass the page here
      setPopularSeries(fetchedMovies);
      setLoading(false);
    };

    getPopularSeries();
  }, [page]);

  return { popularSeries, loading };
};

export default usePopularSeries;
