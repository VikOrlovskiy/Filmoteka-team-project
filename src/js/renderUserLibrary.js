import ref from './Refs'

ref.buttonLibrary.addEventListener('click', onClickLibrary)
  
function onClickLibrary(e) {
    e.preventDefault();
    ref.onSearchInput.classList.add('is-hidden');
    ref.onButtonSearchFilm.classList.add('is-hidden');
    ref.onConteinerBtnLibrary.classList.remove('is-hidden');
    ref.onHeaderContainer.classList.add('header__container--library')
    ref.buttonLibrary.classList.add('current-link')
     ref.buttonHome.classList.remove('current-link')
};
