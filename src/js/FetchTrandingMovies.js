import axios from 'axios';
import refs from "./Refs.js"
import movieCardTpl from "../templates/fetchTrandingMovies.hbs"
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
            return await response.data;   
        
    }

    async searchfetchMovieGenres() {
        const data = await this.fetchTrendingFilms();
        const genresList = await this.fetchGenre();
        return data.map(movie => ({
            ...movie,
            year: movie.release_date ? movie.release_date.split('-')[0] : '',
            genres: movie.genre_ids ? movie.genre_ids
                .map(id => genresList.filter(el => el.id === id))
                .slice(0, 2).flat() : '',
        }
        ));
    }
}

function renderFilmCard(data) {
        
        const murkup = movieCardTpl(data);
        refs.galleryRef.innerHTML = murkup;
        }

const filmsApiService = new FilmsApiService();


filmsApiService.searchfetchMovieGenres().then(renderFilmCard).catch((error) => console.error(error.message));




// const filmsApiService = new FilmsApiService();
// filmsApiService.fetchTrendingFilms().then(({ results, total_results }) => {
    // console.log(results, total_results);
    // for (const result of results) {
    //     console.log(result.genre_ids);
    // }
    
    // renderFilmCard(results);
// });


// filmsApiService.fetchGenre().then(data => {
    // console.log(data.genres);
    //     for (const genre of data.genres) {
    //         console.log(genre);
    //     }
    
    // });