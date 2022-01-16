import refs from './Refs.js';
import movieCardTpl from '../templates/fetchMovieTemplate.hbs';
import DataFetch from './filmServiceApi';

function renderMovieCardFilms(films) {
  return films.results.map(
    ({ original_title, release_date, poster_path, genre_ids, vote_average, id }) => {
      let year = changeYear(release_date);
      let genre = changeGenrys(genre_ids);
      refs.galleryRef.insertAdjacentHTML(
        'afterbegin',
        `<ul  class="gallery__card-set">${movieCardTpl({ original_title,year, poster_path,genre,vote_average,id,})}</ul>`,
      )},
  );
}
function changeYear(release_date) {
  return release_date.slice(0, 4);
}

function changeGenrys(genre_ids) {
  let genreList = genre_ids
    .map(id => DataFetch.genres.filter(genre => genre.id === id).map(genre => genre.name))
        .flat().slice(0, 3);
    if (genreList.length === 0) {
      return (genreList = [`Unknown`]);
    }
    else {
        return genreList;
    }
       
}
 export { renderMovieCardFilms };