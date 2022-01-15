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
  ref.mainFilmSerch.insertAdjacentHTML('afterbegin', `<ul>${movieTpl(data.results)}</ul>`) 
};

function clearFetchResault() {
  ref.mainFilmSerch.innerHTML = "";
};

