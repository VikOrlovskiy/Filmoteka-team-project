import ref from './Refs'

function showLoader() {
    ref.loader.classList.add('loading');
}

function hideLoader() {
    ref.loader.classList.remove('loading');
}

export { showLoader, hideLoader };