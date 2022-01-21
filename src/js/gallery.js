import { renderMovieCardFilms } from './normaliseRenderFilm';
import { tuiPagination } from './paginationGallery';
import DataFetch from './filmServiceApi.js';
const dataFetch = new DataFetch();

window.addEventListener('load', loadTrendingFilms);
// ========================ЗАГРУЗКА ПОПУЛЯРНЫХ ФИЛЬМОВ====================
async function loadTrendingFilms() {
  await DataFetch.fetchGenres();
  await dataFetch.fetchTopFilms().then(films => {
    renderMovieCardFilms(films);
  });
  tuiPagination();
}

