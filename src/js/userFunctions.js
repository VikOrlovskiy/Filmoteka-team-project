import { authWithEmailAndPassword, RegistrationWithEmailAndPassword,logOutAuthUser,authState,readUserData,writeUserData} from "./fireBaseApi";
import {actionPopUp} from './actionPopUp'
import formLogIn from '../templates/formLogIn.hbs';
import formRegistration from '../templates/formRegistration.hbs';
import Notiflix from 'notiflix';
import Ref from "./refs";
// ==================logOut========================
Ref.logOutButton.addEventListener('click' , logOutAuthUser)
// ==================LogIn========================
Ref.logInButton.addEventListener('click' , onClickregistrationOrlogInUser)
// ==================User auth State========================
const emailCheck = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

authState()
function onClickregistrationOrlogInUser(){
    renderForm(formLogIn)
    Ref.popUp.classList.add("modal_form")
    document.body.classList.add('show-modal');
    let form =  document.querySelector('.form')
    form.addEventListener('submit',onSubmitEntryForm)
    form.querySelector('.to_signup').addEventListener('click',onRegistrationLinkClick)
    actionPopUp()
}
function renderForm(value){
    Ref.popUp.insertAdjacentHTML('afterbegin', value())
}
function onSubmitEntryForm(e){
    e.preventDefault()
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;

    if (!emailCheck.test(email)) {
        Notiflix.Notify.failure('Invalid email. Try again!');
        e.target.querySelector('#email').classList.add('invalid');
        e.target.querySelector('#email').classList.remove('valid');
        return;  
    } else {
       e.target.querySelector('#email').classList.add('valid');
        e.target.querySelector('#email').classList.remove('invalid'); 
    }
    
    authWithEmailAndPassword(email, password);
    this.reset()
    document.body.classList.remove('show-modal');
    Ref.popUp.innerHTML="" ;
}
function onSubmitRegistrationForm(e){
    e.preventDefault()
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;
    const passwordConfirm = e.target.querySelector('#passwordConfirm').value;

    if (!emailCheck.test(email)) {
        Notiflix.Notify.failure('Invalid email. Try again!');
        e.target.querySelector('#email').classList.add('invalid');
        e.target.querySelector('#email').classList.remove('valid');
        return;  
    } else {
       e.target.querySelector('#email').classList.add('valid');
        e.target.querySelector('#email').classList.remove('invalid'); 
    }

    if (password !== passwordConfirm) {
        Notiflix.Notify.failure('Invalid repeat password. Try again!');
        e.target.querySelector('#passwordConfirm').classList.add('invalid');
        e.target.querySelector('#passwordConfirm').classList.remove('valid');
        return;
    } else {
       e.target.querySelector('#passwordConfirm').classList.add('valid');
        e.target.querySelector('#passwordConfirm').classList.remove('invalid'); 
    }

    RegistrationWithEmailAndPassword(email, password);
    this.reset()
    document.body.classList.remove('show-modal');
    Ref.popUp.innerHTML="" ;
}
function onRegistrationLinkClick(e){
    Ref.popUp.innerHTML="" ;
    renderForm(formRegistration)
    let form = document.querySelector('.form')
    form.addEventListener('submit', onSubmitRegistrationForm)
}