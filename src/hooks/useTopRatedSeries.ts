import { useEffect, useState } from 'react';

import fetchTopRatedSeries from '@/utils/getTopRatedSeries';

interface Movie {
  id: number;
  original_name: string;
  genre_ids: [number];
  overview: string;
  vote_average: number;
  backdrop_path: string;
  first_air_date: string;
}

const useTopRatedSeries = (page: number) => {
  const [topRatedSeries, setTopRatedSeries] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopRatedSeries = async () => {
      setLoading(true);
      const fetchedMovies = await fetchTopRatedSeries(page); // Pass the page here
      setTopRatedSeries(fetchedMovies);
      setLoading(false);
    };

    getTopRatedSeries();
  }, [page]);

  return { topRatedSeries, loading };
};

export default useTopRatedSeries;
