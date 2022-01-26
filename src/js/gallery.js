import { renderMovieCardFilms } from './normaliseRenderFilm';
import { tuiPagination } from './paginationGallery';
import DataFetch from './filmServiceApi.js';
import { showLoader, hideLoader } from './loader';
const dataFetch = new DataFetch();

window.addEventListener('load', loadTrendingFilms);
// ========================ЗАГРУЗКА ПОПУЛЯРНЫХ ФИЛЬМОВ====================
async function loadTrendingFilms() {
  await DataFetch.fetchGenres();
  await dataFetch.fetchTopFilms().then(films => {
    renderMovieCardFilms(films);
    showLoader();
  });
  tuiPagination();
  hideLoader();
}
