import {teamItems} from './team-members'
import refs from './Refs'
import team from '../templates/team.hbs'

refs.footerBtnModal.addEventListener('click', onTeamButtonClick)
refs.backdropBtnClose.addEventListener('click', onClickBtnClose);


function onTeamButtonClick() {
    refs.popUp.classList.add("modal_form")
    document.body.classList.add('show-modal');
    renderTeamMembers()
}


function onClickBtnClose(e) {
    e.preventDefault()
    refs.popUp.classList.remove("modal_form");
    document.body.classList.remove("show-modal");
    refs.popUp.innerHTML = "";
}


function renderTeamMembers() {
    console.log(teamItems[0].photo)
    refs.popUp.insertAdjacentHTML('beforeend', team(teamItems));

}
 
