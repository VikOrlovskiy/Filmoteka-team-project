import Pagination from 'tui-pagination';
import refs from './Refs';
import DataFetch from './filmServiceApi.js';
import { renderMovieCardFilms } from './normaliseRenderFilm';
const dataFetch = new DataFetch();

function tuiPaginationSerch() {
  dataFetch.page = 1;
  const pagination2 = new Pagination(refs.paginationRef, {
    totalItems: DataFetch.totalPages,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
  });
  pagination2.on('beforeMove', event => {
    dataFetch.page = event.page;
    dataFetch.fetchFilms().then(films => {
      refs.galleryRef.innerHTML = '';
      renderMovieCardFilms(films);
    });
  });
}

export { tuiPaginationSerch };
