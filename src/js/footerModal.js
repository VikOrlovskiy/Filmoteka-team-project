import { teamItems } from "./teamMembers";
import refs from './Refs'
import team from '../templates/team.hbs'
import { actionPopUp } from './actionPopUp'

refs.footerBtnModal.addEventListener('click', onClickModalOpen)

actionPopUp()

function onClickModalOpen() {
    document.body.classList.add('show-modal');
    refs.popUp.classList.add("modal_form")
    renderTeam()
}

function renderTeam() {
    refs.popUp.insertAdjacentHTML('beforeend', team(teamItems))
}  

