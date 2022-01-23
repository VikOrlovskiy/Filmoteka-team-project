import { onCkickReadUserData } from './fireBaseApi';
import ref from './Refs';
import fetchById from './FetchMovieInformation';
import movieCardTpl from '../templates/fetchMovieTemplate.hbs';

document.querySelector('.header__container').addEventListener('click', onClickReadDataFirebase); 



function onClickReadDataFirebase(e) {
  let dataUser = JSON.parse(localStorage.getItem('userData'));
  if (dataUser !== null) {
    if (e.target.dataset.action === 'Watched') {
      ref.BtnWatched.classList.add('active');
      ref.BtnQueue.classList.remove('active');
      const valueReadUserWatched= onCkickReadUserData( dataUser.accessToken, e.target.dataset.action, dataUser.uid,
      )
      ref.galleryRef.innerHTML = '';
      valueReadUserWatched.then(value => {
        let values = Object.values(value);
        values.filter((course, index, array) => array.indexOf(course) === index)
          .map(e => {fetchById(e).then(result => {renderMovieCard(result);});
          });
      });
      return;
    }
    ref.galleryRef.innerHTML = '';
    ref.BtnWatched.classList.remove('active');
    ref.BtnQueue.classList.add('active');
    const valueReadUserData = onCkickReadUserData(
      dataUser.accessToken,e.target.dataset.action,dataUser.uid,);
    valueReadUserData.then(value => {
      let values = Object.values(value);
       values.filter((value, index, array) => array.indexOf(value) === index)
       .map(e => {
         fetchById(e).then(result => {
           renderMovieCard(result);
         });
       });
      })
  } 
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
  