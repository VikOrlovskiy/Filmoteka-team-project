import { authWithEmailAndPassword, RegistrationWithEmailAndPassword,logOutAuthUser,authState} from "./fireBaseApi";
import Refs from "./Refs";
import {actionPopUp} from './actionPopUp'
import formLogIn from '../templates/formLogIn.hbs';
import formRegistration from '../templates/formRegistration.hbs';
// ==================logOut========================
Refs.logOutButton.addEventListener('click' , logOutAuthUser)
// ==================LogIn========================
Refs.logInButton.addEventListener('click' , onClickregistrationOrlogInUser)
// ==================User auth State========================
authState()

function onClickregistrationOrlogInUser(){
    renderForm(formLogIn)
    Refs.popUp.classList.add("modal_form")
    document.body.classList.add('show-modal');
    let form =  document.querySelector('.form')
    form.addEventListener('submit',onSubmitEntryForm)
    form.querySelector('.to_signup').addEventListener('click',onRegistrationLinkClick)
    actionPopUp()
}

function renderForm(value){
    Refs.popUp.insertAdjacentHTML('afterbegin', value())
}
function onSubmitEntryForm(e){
    e.preventDefault()
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;
    authWithEmailAndPassword(email, password);
    this.reset()
    document.body.classList.remove('show-modal');
    Refs.popUp.innerHTML="" ;
    console.log(email,password)
}
function onSubmitRegistrationForm(e){
    e.preventDefault()
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;
    const passwordConfirm = e.target.querySelector('#passwordConfirm').value;
    RegistrationWithEmailAndPassword(email, password);
    this.reset()
    document.body.classList.remove('show-modal');
    Refs.popUp.innerHTML="" ;
    console.log(email,password,passwordConfirm)
}
function onRegistrationLinkClick(e){
    Refs.popUp.innerHTML="" ;
    renderForm(formRegistration)
    let form = document.querySelector('.form')
    form.addEventListener('submit', onSubmitRegistrationForm)
}
export{onSubmitRegistrationForm,onSubmitEntryForm,renderForm,onRegistrationLinkClick}