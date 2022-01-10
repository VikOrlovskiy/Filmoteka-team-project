import axios from 'axios';
const API_KEY = 'd63b12eb825bf781172e230d745f91db';

export default class ApiService {
  constructor() {
      this.searchQuery = '';
  }
   
  async fetchMovie(searchQuery) {
    const response = await axios
          .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
      console.log(response.data)
    return response.data;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  resetPage() {
    this.page = page;
  }
};
