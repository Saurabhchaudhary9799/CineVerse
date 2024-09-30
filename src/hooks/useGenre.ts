import { useEffect, useState } from 'react';
import fetchGenres from '../utils/getGenres';

const useGenres = () => {
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGenres = async () => {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
      setLoading(false);
    };

    getGenres();
  }, []);

  return { genres, loading };
};

export default useGenres;
