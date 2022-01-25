import refs from './refs'
import team from '../templates/team.hbs'
import { teamItems } from "./teamMembers";
import { actionPopUp } from './actionPopUp'

refs.footerBtnModal.addEventListener('click', onClickModalOpen)

function onClickModalOpen() {
    document.body.classList.add('show-modal');
    refs.popUp.classList.add("modal_form")
    renderTeam()
    actionPopUp()
}

function renderTeam() {
    refs.popUp.insertAdjacentHTML('beforeend', team(teamItems))
}  

