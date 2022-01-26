import ref from './Refs.js';
import filmCard from '../templates/card.hbs';
import userLibraryFilmCard from '../templates/userLibraryFilmCard.hbs';
import movieCardTpl from '../templates/fetchMovieTemplate.hbs';
import Notiflix from 'notiflix';
import dataFetch from "./filmServiceApi";
import { actionPopUp } from './actionPopUp';
import { onCkickWriteUserData ,onCkickRemoveUserData,onCkickReadUserData} from './fireBaseApi';

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
  const  {original_title , poster_path ,vote_average,vote_count,popularity,genres,overview,id} = data
  let rounded = Math.round(popularity * 10) / 10
  if(ref.headerContainer.classList.contains('header__container--library')){
  ref.popUp.insertAdjacentHTML('beforeend', userLibraryFilmCard({rounded,poster_path,original_title,vote_average,original_title,genres,overview,id,vote_count}));
  document.querySelector('.film-detail__btns').addEventListener('click', onClickWriteDataFirebase)
  return  
}
  ref.popUp.insertAdjacentHTML('beforeend', filmCard({rounded,poster_path,original_title,vote_average,original_title,genres,overview,id,vote_count}));
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
          deliteAndReadFilms(dataUser.accessToken,'Watched',userFilmDataWatchedKeys[i],dataUser.uid)
          // onCkickRemoveUserData(dataUser.accessToken,'Watched',userFilmDataWatchedKeys[i],dataUser.uid)
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
          deliteAndReadFilms(dataUser.accessToken,'queue',userFilmDataQueueKeys[i],dataUser.uid)
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
async function deliteAndReadFilms (accessToken,categoryName,userFilmDataWatchedKeys,uid){
  let deliteFilm = await onCkickRemoveUserData(accessToken,categoryName,userFilmDataWatchedKeys,uid)
  let loadRestFilm = await onCkickReadUserData( accessToken, categoryName, uid,)
  if(!loadRestFilm){
    ref.galleryRef.innerHTML = `<li class="text-error">
    <p>You don't have any movies added yet.</p></li>`;
    ref.popUp.innerHTML="" ;
    document.body.classList.remove('show-modal');
    return
  }
  console.log(loadRestFilm)
  let values = Object.values(loadRestFilm);
  values.map(e => {
      dataFetch.fetchFilmByID(e).then(result => {
        renderMovieCard(result);
      });
    });
  ref.galleryRef.innerHTML = '';
  ref.popUp.innerHTML="" ;
  document.body.classList.remove('show-modal');
}
function renderMovieCard(e) {
  e.release_date = e.release_date.slice(0, 4)
 e.genres = ganreElement(e.genres) 
  ref.galleryRef.insertAdjacentHTML('afterbegin',movieCardTpl(e));
}

const ganreElement = (e) => {
 if(e.length===0) {
  return `Unknown`;
 }
 else {
  return e.map(id => id.name).slice(0,2);}
}
  