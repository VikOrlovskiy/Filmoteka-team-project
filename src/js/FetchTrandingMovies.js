import axios from 'axios';


const API_KEY = 'd63b12eb825bf781172e230d745f91db';
const BASE_URL = 'https://api.themoviedb.org/3';


export default class FilmsApiService {
        constructor() {
            
    }
    async fetchTrendingFilms() {
        const response = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
             return await response.data.results;   
      
    }
    async fetchGenre() {
            const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
            return await response.data.genres;   
        
    }

    async searchfetchMovieGenres() {
        const data = await this.fetchTrendingFilms();
        const genresList = await this.fetchGenre();
        return data.map(movie => ({
            ...movie,
            year: movie.release_date ? movie.release_date.split('-')[0] : '',
            genres: movie.genre_ids ? movie.genre_ids
                .map(id => genresList.filter(el => el.id === id))
                .slice(0, 2).flat() : '',}
        ));
    }
}


