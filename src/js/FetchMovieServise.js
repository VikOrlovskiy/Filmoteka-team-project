import FetchMovieHeader from './filmServiceApi';
import movieTpl from '../templates/fetchMovieTemplate.hbs';
const fetchMovieHeader = new FetchMovieHeader;
import ref from './Refs';
import { showLoader, hideLoader } from './loader'


ref.formFilmSerch.addEventListener('submit', onSearch);

function onSearch (e)  {
  e.preventDefault();
  fetchMovieHeader.query = e.currentTarget.elements.query.value.trim();
  clearFetchResault() 
  if (fetchMovieHeader.query === "") {
    clearFetchResault()
  }
  else {    
    fetchMovieHeader.fetchFilms().then(renderMovieList).catch(error => {
      console.log(error.message);
    });
  }
};

function renderMovieList(data) {
  const dataNormalise=data.results.map(movie => ({
    ...movie,
      year: movie.release_date ? movie.release_date.split('-')[0] : '',}));
  ref.galleryRef.insertAdjacentHTML('afterbegin', `<ul  class="gallery__card-set">${movieTpl(dataNormalise)}</ul>`) 
};

function clearFetchResault() {
  ref.galleryRef.innerHTML = "";
};

