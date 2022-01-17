import ref from "./Refs.js";
import filmCard from '../templates/card.hbs';
// import FilmsApiService1 from "./filmServiceApi";
const ESC_KEY_DOWN = 'Escape';
import fetchById from './FetchMovieInformation';

export default function listenerPopUp(){
  
  const refs={
    gallery:document.querySelector('.gallery__card-set')
  } 
      refs.gallery.addEventListener('click', onOpenPopUpTest)
  }
  
  function onOpenPopUpTest(e) {
    let id
    e.preventDefault();

    ref.backdropBtnClose.addEventListener('click', clickBtnClose);
    ref.backdrop.addEventListener('click', onClickPopUp);
    window.addEventListener('keydown', onEscKeyDown);

    if(e.target.parentNode.parentNode.parentNode.classList.contains('gallery__card')){
      id = e.target.parentNode.parentNode.id
      document.body.classList.add('show-modal');
      fetchById(id).then(renderFilmCard)
      return
    }
    // if(e.currentTarget.parentNode){
    //   id = e.currentTarget.id
    //   document.body.classList.add('show-modal');
    //   fetchById(id).then(renderFilmCard)
    // }
  }

  // fuction renderFilmCard by Id
  function renderFilmCard(data){
    ref.popUp.insertAdjacentHTML('beforeend', `${filmCard(data)}`) ;
  }

  // function close Pop-Up
  function onClosePopUp() {
    window.removeEventListener('keydown', onEscKeyDown);
    document.body.classList.remove('show-modal');
    ref.popUp.innerHTML="" ;
  }
  
  // function Click Btn
  function clickBtnClose(e) {
    e.preventDefault();
    onClosePopUp();
  }
  
  // function Click Backdrop
  function onClickPopUp(e) {
    e.preventDefault();
    if (e.target == e.currentTarget) {
      onClosePopUp();
    }
  }
  
  // function keydown Esc
  function onEscKeyDown(e) {
    if (e.code === ESC_KEY_DOWN) {
      onClosePopUp();
    }
  }
