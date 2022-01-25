import ref from './refs'

ref.buttonLibrary.addEventListener('click', onClickLibrary)
//ref.buttonHome.addEventListener('click', onClickLibrary);
ref.buttonHome.addEventListener('click', onClickReloadPage);
ref.backHomePage.addEventListener('click', onClickReloadPage);

function onClickReloadPage() {
    location.reload();
};

function onClickLibrary(e) {
    e.preventDefault();
    ref.galleryRef.innerHTML = '';
    document.querySelector('.tui-pagination').innerHTML = '';
    ref.searchForm.classList.add('is-hidden');
    ref.conteinerBtnLibrary.classList.remove('is-hidden');
    ref.headerContainer.classList.add('header__container--library');
    ref.buttonLibrary.classList.add('current-link');
    ref.buttonHome.classList.remove('current-link');
    let dataUser = JSON.parse(localStorage.getItem('userData'));
    if (dataUser === null) {
        document.querySelector('.header__container').insertAdjacentHTML(
            'beforeend',`<p class="message-register">You need to register to accesse</p>`,
          );
    }
};
