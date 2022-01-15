import FetchMovieHeader from './FetchMovie';
import movieTpl from '../templates/fetchMovieTemplate.hbs';
const fetchMovieHeader = new FetchMovieHeader;
import ref from './Refs';
import { showLoader, hideLoader } from './loader'


ref.onFormFilmSerch.addEventListener('submit', onSearch);

function onSearch (e)  {
  e.preventDefault();
  fetchMovieHeader.query = e.currentTarget.elements.query.value.trim();
  clearFetchResault() 
  if (fetchMovieHeader.query === "") {
    clearFetchResault()
  }
  else {    
    fetchMovieHeader.searchfetchMovieGenres().then(renderMovieList);
  }
};

function renderMovieList(data) {
  ref.onMainFilmSerch.insertAdjacentHTML('afterbegin', `<ul>${movieTpl(data)}</ul>`) 
};

function clearFetchResault() {
  ref.onMainFilmSerch.innerHTML = "";
};
