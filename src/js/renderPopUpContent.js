import ref from './Refs.js';
import filmCard from '../templates/card.hbs';
import userLibraryFilmCard from '../templates/userLibraryFilmCard.hbs';
import Notiflix from 'notiflix';
import dataFetch from "./filmServiceApi";
import { actionPopUp } from './actionPopUp';
import { onCkickWriteUserData ,onCkickRemoveUserData} from './fireBaseApi';

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
    await dataFetch.fetchFilmByID(id).then(renderFilmCard);
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
    if(ref.BtnWatched.classList.contains('active')){
      let userFilmDataWatchedValues = Object.values(JSON.parse(localStorage.getItem('Watched')));
      let userFilmDataWatchedKeys = Object.keys(JSON.parse(localStorage.getItem('Watched')));
      for (let i = 0; i < userFilmDataWatchedValues.length; i +=1) {
        if(userFilmDataWatchedValues[i] === e.target.parentNode.id){
          onCkickRemoveUserData(dataUser.accessToken,'Watched',userFilmDataWatchedKeys[i],dataUser.uid)
          ref.popUp.innerHTML="" ;
          document.body.classList.remove('show-modal');
        }
      }
      e.target.disabled = true;
      e.target.textContent = 'removed'
      return
    }
    if(ref.BtnQueue.classList.contains('active')){
      let userFilmDataQueueValues = Object.values(JSON.parse(localStorage.getItem('queue')));
      let userFilmDataQueueKeys = Object.keys(JSON.parse(localStorage.getItem('queue')));
      for (let i = 0; i < userFilmDataQueueValues.length; i +=1) {
        if(userFilmDataQueueValues[i] === e.target.parentNode.id){
          onCkickRemoveUserData(dataUser.accessToken,'queue',userFilmDataQueueKeys[i],dataUser.uid)
        }
      }
      e.target.disabled = true;
      e.target.textContent = 'removed'
      return
    }
   return 
  }
  onCkickWriteUserData(dataUser.accessToken,e.target.dataset.action,dataUser.uid,e.target.parentNode.id)
  e.target.disabled = true;
  e.target.textContent = 'added to Queue'
}else{
  Notiflix.Notify.failure('log in to use');
e.target.disabled = true;}

}
