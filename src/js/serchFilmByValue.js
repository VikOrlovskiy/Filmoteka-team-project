import DataFetch from "./filmServiceApi.js";
import { renderMovieCardFilms } from './normaliseRenderFilm';
const dataFetch = new DataFetch();
import ref from './Refs';
import { showLoader, hideLoader } from './loader'
import renderPopUpContent from './renderPopUpContent';
ref.buttonFilmSerch.disabled = true;

ref.formFilmSerch.addEventListener('submit', onSearch);
ref.inputFilmSerch.addEventListener('input', onSearchInput);
function onSearch (e)  {
  e.preventDefault();
  dataFetch.query = e.currentTarget.elements.query.value.trim();
    dataFetch
      .fetchFilms()
      .then(renderMovieCardFilms).then(renderPopUpContent)
      .catch(error => {
        console.log(error.message);
      });
};

function onSearchInput(e) {
  e.preventDefault();
  if (!e.currentTarget.value) {
    ref.buttonFilmSerch.disabled = true;
    dataFetch.fetchTopFilms().then(renderMovieCardFilms)
  }
  else {
    ref.buttonFilmSerch.disabled = false;
  }
}
