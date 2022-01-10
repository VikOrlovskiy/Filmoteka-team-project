import ApiServise from './FetchMovie';
import movieTpl from '../templates/fetchMovieTemplate.hbs';

const form = document.querySelector('.form-search');
const apiServise = new ApiServise();
const main = document.querySelector('main');

form.addEventListener('submit', onSearch);

function onSearch (e)  {
   e.preventDefault();
   apiServise.query = e.currentTarget.elements.query.value.trim();
   console.log(apiServise.query)
  apiServise.fetchMovie(apiServise.query).then( renderMovieList);
};

function renderMovieList(data) {
   main.insertAdjacentHTML('beforeend', movieTpl(data.results))
   
};
