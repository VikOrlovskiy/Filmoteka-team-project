import { onCkickReadUserData } from './fireBaseApi';
import ref from './refs';
import test from "./filmServiceApi";
import movieCardTpl from '../templates/fetchMovieTemplate.hbs';

ref.BtnWatched.addEventListener('click', onClickReadDataFirebase);
ref.BtnQueue.addEventListener('click', onClickReadDataFirebase);
ref.buttonLibrary.addEventListener('click', onClickReadDataFirebase);
ref.BtnWatched.disabled = true;

function onClickReadDataFirebase(e) {
  let dataUser = JSON.parse(localStorage.getItem('userData'));
  if (dataUser !== null) {
    if (e.target.dataset.action === 'Watched') {
      ref.BtnWatched.classList.add('active');
      ref.BtnQueue.classList.remove('active');
      const valueReadUserWatched= onCkickReadUserData( dataUser.accessToken, e.target.dataset.action, dataUser.uid,
      )
      console.log(valueReadUserWatched)
      ref.galleryRef.innerHTML = '';
      valueReadUserWatched.then(value => {
         if (value === null) {
           ref.galleryRef.innerHTML = `<li class="text-error">
          <p>You don't have any movies added yet.</p></li>`;
         }
else{
  localStorage.setItem(`${e.target.dataset.action}`, JSON.stringify(value));
  let values = Object.values(value);
  values
    .filter((course, index, array) => array.indexOf(course) === index)
    .map(e => {
      test.fetchFilmByID(e).then(result => {
        renderMovieCard(result);
      });
    });
}
      });
      ref.BtnWatched.disabled = true;
        ref.BtnQueue.disabled = false;
      return;
    }
    ref.galleryRef.innerHTML = '';
    ref.BtnWatched.classList.remove('active');
    ref.BtnQueue.classList.add('active');
    const valueReadUserData = onCkickReadUserData(
      dataUser.accessToken,e.target.dataset.action,dataUser.uid,);
    valueReadUserData.then(value => {
      if (value === null) {
        ref.galleryRef.innerHTML = `<li class="text-error">
          <p>You don't have any movies added yet.</p></li>`;
      }
      else {
        localStorage.setItem(`${e.target.dataset.action}`, JSON.stringify(value));
        let values = Object.values(value);
        values.filter((value, index, array) => array.indexOf(value) === index)
          .map(e => {
            test.fetchFilmByID(e).then(result => {
              renderMovieCard(result);
            });
          });
      }
    })
    ref.BtnWatched.disabled = false;
    ref.BtnQueue.disabled = true;
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
  