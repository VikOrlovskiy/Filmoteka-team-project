import DataFetch from './filmServiceApi.js';
import { renderMovieCardFilms } from './normaliseRenderFilm';
const dataFetch = new DataFetch();
import ref from './Refs';
import { showLoader, hideLoader } from './loader';
import Pagination from 'tui-pagination';
ref.buttonFilmSerch.disabled = true;

ref.formFilmSerch.addEventListener('submit', onSearch);
ref.inputFilmSerch.addEventListener('input', onSearchInput);
function onSearch(e) {
  e.preventDefault();
  dataFetch.query = e.currentTarget.elements.query.value.trim();
  ref.galleryRef.innerHTML = '';
  dataFetch
    .fetchFilms()
    .then(renderMovieCardFilms)
    .catch(error => {
      console.log(error.message);
    });
  tuiPaginationSerch();
}

function onSearchInput(e) {
  e.preventDefault();
  if (!e.currentTarget.value) {
    ref.buttonFilmSerch.disabled = true;
    dataFetch.fetchTopFilms().then(renderMovieCardFilms);
  } else {
    ref.buttonFilmSerch.disabled = false;
  }
}

function tuiPaginationSerch() {
  dataFetch.page = 1;
  const options = {
    totalItems: DataFetch.totalPages,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };

  const pagination2 = new Pagination(ref.paginationRef, options);
  pagination2.reset();
  pagination2.on('beforeMove', function (eventData) {
    dataFetch.page = eventData.page;
    dataFetch.fetchFilms().then(films => {
      ref.galleryRef.innerHTML = '';
      renderMovieCardFilms(films);
    });
  });
}
