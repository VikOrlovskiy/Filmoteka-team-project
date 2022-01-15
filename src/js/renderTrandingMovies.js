import refs from "./Refs.js";
import movieCardTpl from "../templates/fetchMovieTemplate.hbs";
import FilmsApiService from "./FetchTrandingMovies.js";
const filmsApiService = new FilmsApiService();

filmsApiService.searchfetchMovieGenres().then(renderFilmCard);

function renderFilmCard(data) {
  refs.galleryRef.insertAdjacentHTML('afterbegin', `<ul class="gallery__card-set">${movieCardTpl(data)}</ul>`) 
};

