import ref from "./Refs.js";
const ESC_KEY_DOWN = 'Escape';


function actionPopUp(){
    ref.backdropBtnClose.addEventListener('click', clickBtnClose);
    ref.backdrop.addEventListener('click', onClickPopUp);
    document.addEventListener('keydown', onEscKeyDown);
  }

  // function close Pop-Up
  function onClosePopUp() {
    window.removeEventListener('keydown', onEscKeyDown);
    document.body.classList.remove('show-modal');
    ref.popUp.innerHTML="" ;
  }
  
  // function Click Btn
  function clickBtnClose(e) {
    onClosePopUp();
  }
  
  // function Click Backdrop
  function onClickPopUp(e) {
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
export {actionPopUp}