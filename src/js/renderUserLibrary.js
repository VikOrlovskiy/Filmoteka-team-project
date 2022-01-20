import ref from './Refs'

ref.buttonLibrary.addEventListener('click', onClickLibrary)
ref.buttonHome.addEventListener('click', onClickLibrary);
ref.backHomePage.addEventListener('click', onClickReloadPage);

function onClickReloadPage() {
    location.reload();
};

function onClickLibrary(e) {
    e.preventDefault();
    ref.searchForm.classList.toggle('is-hidden');
    ref.conteinerBtnLibrary.classList.toggle('is-hidden');
    ref.headerContainer.classList.toggle('header__container--library');
    ref.buttonLibrary.classList.toggle('current-link');
    ref.buttonHome.classList.toggle('current-link');
};
