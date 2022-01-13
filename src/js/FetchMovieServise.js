import FetchMovieHeader from './FetchMovie';
import movieTpl from '../templates/fetchMovieTemplate.hbs';
const fetchMovieHeader = new FetchMovieHeader;
import ref from './Refs'


ref.formFilmSerch.addEventListener('submit', onSearch);

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
  ref.mainFilmSerch.insertAdjacentHTML('afterbegin', `<ul>${movieTpl(data)}</ul>`) 
};

function clearFetchResault() {
  ref.mainFilmSerch.innerHTML = "";
};

