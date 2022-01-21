import { teamItems } from "./teamMembers";
import refs from './Refs'
import team from '../templates/team.hbs'

refs.footerBtnModal.addEventListener('click', onClickModalOpen)
refs.backdropBtnClose.addEventListener('click', onClickModalClose)
document.addEventListener('keydown', onBackdropClickClose)

function onClickModalOpen() {
    document.body.classList.add('show-modal');
    refs.popUp.classList.add("modal_form")
    renderTeam()
}

function onClickModalClose() {
    document.body.classList.remove('show-modal');
    refs.popUp.classList.remove("modal_form")
    refs.popUp.innerHTML="" 
}

function onBackdropClickClose(e) {
    if (e.key === 'Escape') {
        onClickModalClose()
    }
}

function renderTeam() {
    refs.popUp.insertAdjacentHTML('beforeend', team(teamItems))
}  