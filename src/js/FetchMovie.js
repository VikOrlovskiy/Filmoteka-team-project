import axios from 'axios';

const API_KEY = 'd63b12eb825bf781172e230d745f91db';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
  }
   
  async fetchMovie() {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${this.searchQuery}`);
    return response.data.results   
  }
  //Список жанров.
  async fetchMovieList() {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&query=${this.searchQuery}`)
    return response.data.genres
  };

//Назви жанрів і формат дати.
  async searchfetchMovieGenres() {
    const data = await this.fetchMovie();
    const genresList = await this.fetchMovieList();
    return data.map(movie => ({
    ...movie,
      year: movie.release_date ? movie.release_date.split('-')[0] : '',
      genres: movie.genre_ids ? movie.genre_ids
          .map(id => genresList.filter(el => el.id === id))
          .slice(0, 2).flat(): '',}
    ));
  }


  
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
};