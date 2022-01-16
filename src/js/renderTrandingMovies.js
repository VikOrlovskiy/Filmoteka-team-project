import DataFetch from './filmServiceApi'
import { renderMovieCardFilms } from './normaliseRenderFilm';
const dataFetch = new DataFetch();

window.addEventListener('load', onloadPopularFilms);

async function onloadPopularFilms() {
  await DataFetch.fetchGenres();
  await dataFetch
    .fetchTopFilms()
    .then(renderMovieCardFilms)
    .catch(error => {
      console.log(error.message);
    });
}


