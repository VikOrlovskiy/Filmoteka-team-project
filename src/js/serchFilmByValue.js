import DataFetch from "./filmServiceApi.js";
import { renderMovieCardFilms } from './normaliseRenderFilm';
const dataFetch = new DataFetch();
import ref from './Refs';
import { showLoader, hideLoader } from './loader'
import renderPopUpContent from './renderPopUpContent';


ref.formFilmSerch.addEventListener('submit', onSearch);

function onSearch (e)  {
  e.preventDefault();
  dataFetch.query = e.currentTarget.elements.query.value.trim();
  clearFetchResault() 
  if (DataFetch.query === "") {
    clearFetchResault()
  }
  else {    
    dataFetch
      .fetchFilms()
      .then(renderMovieCardFilms).then(renderPopUpContent)
      .catch(error => {
        console.log(error.message);
      });
  }
};

function clearFetchResault() {
  ref.galleryRef.innerHTML = "";
};
