import { onCkickReadUserData } from './fireBaseApi';
import Notiflix from 'notiflix';
import ref from './Refs';



   document.querySelector('.button-list').addEventListener('click', onClickReadDataFirebase); 



function onClickReadDataFirebase(e) {
  let dataUser = JSON.parse(localStorage.getItem('userData'));
  if (dataUser !== null) {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    if (e.target.dataset.action === 'btn-watched') {
      onCkickReadUserData( dataUser.accessToken, e.target.dataset.action, dataUser.uid,
      ).then(response => console.log({ ...response }));
      Notiflix.Notify.success('Watched');
      return;
    }
      onCkickReadUserData(dataUser.accessToken, e.target.dataset.action, dataUser.uid,).then(
        response => console.log({ ...response }),
      );
    Notiflix.Notify.success('Queue')
  } else {
    Notiflix.Notify.failure('log in to use');
  }
}
