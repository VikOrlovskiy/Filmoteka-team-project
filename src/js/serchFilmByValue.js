import DataFetch from "./filmServiceApi.js";
import { renderMovieCardFilms } from './normaliseRenderFilm';
const dataFetch = new DataFetch();
import ref from './Refs';
import { showLoader, hideLoader } from './loader'
ref.buttonFilmSerch.disabled = true;

ref.formFilmSerch.addEventListener('submit', onSearch);
ref.inputFilmSerch.addEventListener('input', onSearchInput);
function onSearch (e)  {
  e.preventDefault();
  dataFetch.query = e.currentTarget.elements.query.value.trim();
  ref.galleryRef.innerHTML="" 
    dataFetch
      .fetchFilms()
      .then(renderMovieCardFilms)
      .catch(error => {
        console.log(error.message);
      });
};
