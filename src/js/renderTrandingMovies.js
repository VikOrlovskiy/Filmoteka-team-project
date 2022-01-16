import refs from "./Refs.js";
import movieCardTpl from "../templates/fetchMovieTemplate.hbs";
import FilmsApiService from "./FetchTrandingMovies.js";
const filmsApiService = new FilmsApiService();
import renderPopUpContent from './renderPopUpContent';

filmsApiService.searchfetchMovieGenres().then(renderFilmCard).then(renderPopUpContent);

function renderFilmCard(data) {
  refs.galleryRef.insertAdjacentHTML('afterbegin', `<ul class="gallery__card-set">${movieCardTpl(data)}</ul>`) 
};

