import ref from './Refs.js';
import filmCard from '../templates/card.hbs';
import { actionPopUp } from './actionPopUp';
// import FilmsApiService1 from "./filmServiceApi";
const ESC_KEY_DOWN = 'Escape';
import fetchById from './FetchMovieInformation';

 ref.gallery.addEventListener('click', onOpenPopUp);

function onOpenPopUp(e) {
  e.preventDefault();
  let id;
  actionPopUp();
  if (
    e.target.classList.contains('gallery__image') ||
    e.target.classList.contains('gallery__title')
  ) {
    id = e.target.parentNode.parentNode.id;
    document.body.classList.add('show-modal');
    fetchById(id).then(renderFilmCard);
    return;
  }

}

// fuction renderFilmCard by Id
function renderFilmCard(data) {
  ref.popUp.insertAdjacentHTML('beforeend', `${filmCard(data)}`);
}
