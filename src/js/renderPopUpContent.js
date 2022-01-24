import ref from './Refs.js';
import filmCard from '../templates/card.hbs';
import userLibraryFilmCard from '../templates/userLibraryFilmCard.hbs';
import { actionPopUp } from './actionPopUp';
import { onCkickWriteUserData } from './fireBaseApi';
import Notiflix from 'notiflix';
import test from "./filmServiceApi";
// import fetchById from './FetchMovieInformation';

 ref.gallery.addEventListener('click', onOpenPopUp);

async function onOpenPopUp(e) {
  e.preventDefault();
  let id;
  actionPopUp();
  if (
    e.target.classList.contains('gallery__image') ||
    e.target.classList.contains('gallery__title')
  ) {
    id = e.target.parentNode.parentNode.id;
    document.body.classList.add('show-modal');
    // await fetchById(id).then(renderFilmCard);
    await test.fetchFilmByID(id).then(renderFilmCard);
    return;
  }
}

// fuction renderFilmCard by Id
function renderFilmCard(data) {
  if(ref.headerContainer.classList.contains('header__container--library')){
  ref.popUp.insertAdjacentHTML('beforeend', `${userLibraryFilmCard(data)}`);
  document.querySelector('.film-detail__btns').addEventListener('click', onClickWriteDataFirebase)
  return  
}
  ref.popUp.insertAdjacentHTML('beforeend', `${filmCard(data)}`);
  document.querySelector('.film-detail__btns').addEventListener('click', onClickWriteDataFirebase)
}
// ================firebase writeUserData=====================
function onClickWriteDataFirebase(e){
  let dataUser = JSON.parse(localStorage.getItem('userData'))
  if(dataUser !== null){
  if(e.target.nodeName !== 'BUTTON'){return}
  if(e.target.dataset.action === 'Watched'){
    onCkickWriteUserData(dataUser.accessToken,e.target.dataset.action,dataUser.uid,e.target.parentNode.id)
    e.target.disabled = true;
    e.target.textContent = 'added to Watch'
   return 
  }
  if(e.target.dataset.action === 'remove'){
    console.log('remove film')
    e.target.disabled = true;
    e.target.textContent = 'removed'
   return 
  }
  onCkickWriteUserData(dataUser.accessToken,e.target.dataset.action,dataUser.uid,e.target.parentNode.id)
  e.target.disabled = true;
  e.target.textContent = 'added to Queue'
}else{
  Notiflix.Notify.failure('log in to use');
e.target.disabled = true;}

}
