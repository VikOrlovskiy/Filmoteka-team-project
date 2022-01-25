import ref from './refs'

function showLoader() {
    ref.loader.classList.add('loading');
}

function hideLoader() {
    ref.loader.classList.remove('loading');
}

export { showLoader, hideLoader };