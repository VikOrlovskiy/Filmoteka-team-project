import refs from "./Refs.js";
import movieCardTpl from "../templates/fetchTrandingMovies.hbs";
import FilmsApiService from "./FetchTrandingMovies.js";
const filmsApiService = new FilmsApiService();

filmsApiService.searchfetchMovieGenres().then(renderFilmCard);

function renderFilmCard(data) {
  refs.galleryRef.insertAdjacentHTML('afterbegin', `<ul>${movieCardTpl(data)}</ul>`) 
};

// function renderFilmCard(data) {
        
//         const murkup = movieCardTpl(data);
//         refs.galleryRef.innerHTML = murkup;
//         }

