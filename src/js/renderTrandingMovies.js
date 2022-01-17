import refs from "./Refs.js";
import movieCardTpl from "../templates/fetchMovieTemplate.hbs";
import DataFetch from "./filmServiceApi.js";
const dataFetch = new DataFetch();

window.addEventListener('load', loadTrendingFilms);

// ========================ЗАГРУЗКА ПОПУЛЯРНЫХ ФИЛЬМОВ====================

async function loadTrendingFilms() {
  await DataFetch.fetchGenres();
  await dataFetch.fetchTopFilms().then(films => {
    renderFilmCard(films.results)
  });
};

// =============================РЕНДЕР КАРТОЧКИ==============================

function renderFilmCard(films) {
  return films.map(({ original_title, release_date, poster_path, genre_ids, vote_average, id }) => {
    let changedYear = releaseYear(release_date);
    let filmGenry = filterGenries(genre_ids);
    refs.galleryRef.insertAdjacentHTML('afterbegin', movieCardTpl({filmGenry ,original_title , changedYear, poster_path ,vote_average,id}));
  })
}

// ===============================ФИЛЬТР  ДАТЫ==================================

 function releaseYear(release_date){
   let changedYear = release_date.slice(0, 4)
   return changedYear;
}
  
// ================================ФИЛЬТР  ЖАНРОВ=================================

  function filterGenries(genre_ids){
    let genreList = genre_ids
    .map(id => DataFetch.genres.filter(genre => genre.id === id).map(genre => genre.name))
      .flat();
    if (genreList.length === 0) {
      return (genreList = [`Unknown`]);
    }
    if (genreList.length === 1) {
      return (genreList = [`${genreList[0]}`]);
    }
    if (genreList.length === 2) {
      return (genreList = [`${genreList[0]}, ${genreList[1]}`]);
    } else if (genreList.length > 2) {
      return (genreList = `${genreList[0]}, ${genreList[1]}, Other`);
    }
  }