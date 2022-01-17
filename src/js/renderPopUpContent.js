import ref from "./Refs.js";
import filmCard from '../templates/filmCard.hbs';
// import FilmsApiService1 from "./filmServiceApi";
const ESC_KEY_DOWN = 'Escape';
import fetchById from './FetchMovieInformation';

export default function listenerPopUp(){
  
  const refs={
    items:document.querySelectorAll('.gallery__card'),

    gallery:document.querySelector('.gallery__card-set')
  } 
    // refs.items.forEach(item => {
    //   item.addEventListener('click', onOpenPopUp);
    //   });
    
      // ref.backdropBtnClose.addEventListener('click', clickBtnClose);
      // ref.backdrop.addEventListener('click', onClickPopUp);
      refs.gallery.addEventListener('click', onOpenPopUpTest)
  }
  
  // function open Pop-Up
  // function onOpenPopUp(e) {
  //   let id
  //   e.preventDefault();

  //   ref.backdropBtnClose.addEventListener('click', clickBtnClose);
  //   ref.backdrop.addEventListener('click', onClickPopUp);

  //   window.addEventListener('keydown', onEscKeyDown);
  //   if(e.currentTarget.parentNode.classList.contains('gallery__card-set')){
  //     id = e.currentTarget.dataset.id
  //     document.body.classList.add('show-modal');
  //     fetchById(id).then(renderFilmCard)
  //     return
  //   }
  //   if(e.currentTarget.parentNode){
  //     id = e.currentTarget.dataset.id
  //     document.body.classList.add('show-modal');
  //     fetchById(id).then(renderFilmCard)
  //   }
  // }


  function onOpenPopUpTest(e) {
    let id
    e.preventDefault();

    ref.backdropBtnClose.addEventListener('click', clickBtnClose);
    ref.backdrop.addEventListener('click', onClickPopUp);
    window.addEventListener('keydown', onEscKeyDown);


    console.log(e.target.parentNode.parentNode)
    console.log(e.currentTarget)
    if(e.target.parentNode.parentNode.classList.contains('gallery__card')){
      id = e.target.parentNode.parentNode.dataset.id
      document.body.classList.add('show-modal');
      fetchById(id).then(renderFilmCard)
      return
    }
    if(e.currentTarget.parentNode){
      id = e.currentTarget.dataset.id
      document.body.classList.add('show-modal');
      fetchById(id).then(renderFilmCard)
    }
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