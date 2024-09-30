import axios from 'axios';

const fetchTopRatedSeries = async (page: number) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const response = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    return [];
  }
};

export default fetchTopRatedSeries;
