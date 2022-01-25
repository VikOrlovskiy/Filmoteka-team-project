import Pagination from 'tui-pagination';
import refs from './refs';
import DataFetch from './filmServiceApi.js';
import { renderMovieCardFilms } from './normaliseRenderFilm';
const dataFetch = new DataFetch();

function tuiPagination() {
  dataFetch.page = 0;
  const options = {
    totalItems: DataFetch.totalPages,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };

  const pagination = new Pagination(refs.paginationRef, options);
  pagination.reset();
  pagination.on('beforeMove', function (eventData) {
    dataFetch.page = eventData.page;
    dataFetch.fetchTopFilms().then(films => {
      refs.galleryRef.innerHTML = '';
      renderMovieCardFilms(films);
    });
  });
}
export { tuiPagination };
