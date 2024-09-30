import axios from 'axios';

const fetchGenres = async () => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    return response.data.genres; // Return the genres array
  } catch (error) {
    console.error('Error fetching genres:', error);
    return []; // Return an empty array on error
  }
};

export default fetchGenres;
