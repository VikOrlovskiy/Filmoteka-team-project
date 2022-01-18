import ref from './Refs'

ref.buttonLibrary.addEventListener('click', onClickLibrary)
  
function onClickLibrary(e) {
    e.preventDefault();
    ref.searchForm.classList.add('is-hidden');
    ref.conteinerBtnLibrary.classList.remove('is-hidden');
    ref.headerContainer.classList.add('header__container--library')
    ref.buttonLibrary.classList.add('current-link')
    ref.buttonHome.classList.remove('current-link')
};

ref.backHomePage.addEventListener('click' , onClickReloadPage)
function onClickReloadPage(){location.reload()}
