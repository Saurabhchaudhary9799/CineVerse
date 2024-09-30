import axios from 'axios';

const fetchPopularSeries = async (page: number) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export default fetchPopularSeries;
