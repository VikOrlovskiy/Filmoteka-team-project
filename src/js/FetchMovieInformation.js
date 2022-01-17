import axios from 'axios';


const API_KEY = 'd63b12eb825bf781172e230d745f91db';
const BASE_URL = 'https://api.themoviedb.org/3';


export default function fetchById(id) {
    return  fetch (`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then(response=>{return response.json()})
  } 