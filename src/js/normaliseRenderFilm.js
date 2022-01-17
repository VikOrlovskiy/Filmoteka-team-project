import refs from './Refs.js';
import movieCardTpl from '../templates/fetchMovieTemplate.hbs';
import DataFetch from './filmServiceApi';
// ====== function render gallery film  card ====
function renderMovieCardFilms(films) {
  return films.results.map(
    ({ original_title, release_date, poster_path, genre_ids, vote_average, id }) => {
      let changedYear = changeYear(release_date);
      let filmGenry = changeGenrys(genre_ids);
      refs.galleryRef.insertAdjacentHTML('afterbegin',movieCardTpl({original_title,changedYear,poster_path,filmGenry,vote_average,id,}),
      );
    },
  );
}
// ========= function correct Year================
function changeYear(release_date) {return release_date.slice(0, 4);}
// ========= function correct Genrys==============
function changeGenrys(genre_ids) {
  let genreList = genre_ids
    .map(id => DataFetch.genres.filter(genre => genre.id === id).map(genre => genre.name))
    .flat();
  if (genreList.length === 0) {
    return (genreList = [`Unknown`]);
  }
  if (genreList.length >= 1 && genreList.length <= 2) {
    return genreList.slice(0, 2);
  } else {
    return (genreList = `${genreList[0]}, ${genreList[1]}, Other`);
  }
}
export { renderMovieCardFilms };
