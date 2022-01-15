import { authWithEmailAndPassword, RegistrationWithEmailAndPassword,} from "./fireBaseApi";
import Refs from "./Refs";
import formLogIn from '../templates/formLogIn.hbs';
import formRegistration from '../templates/formRegistration.hbs';6
function renderForm(value){
    // Refs.modalContentContainer.insertAdjacentHTML('afterbegin', value())
}
function onSubmitEntryForm(e){
    e.preventDefault()
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;
    authWithEmailAndPassword(email, password);
    this.reset()
    // Refs.body.classList.remove("modal-open")
    // Refs.backDrop.classList.add('is-hidden')
    // Refs.modalWindow.classList.remove("modal_form")
    // Refs.modalContentContainer.innerHTML = ''
    console.log(email,password)
}
function onSubmitRegistrationForm(e){
    e.preventDefault()
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;
    const passwordConfirm = e.target.querySelector('#passwordConfirm').value;
    RegistrationWithEmailAndPassword(email, password);
    this.reset()
    // Refs.body.classList.remove("modal-open")
    // Refs.backDrop.classList.add('is-hidden')
    // Refs.modalWindow.classList.remove("modal_form")
    // Refs.modalContentContainer.innerHTML = ''
    console.log(email,password,passwordConfirm)
}
function onRegistrationLinkClick(e){
    // Refs.modalContentContainer.innerHTML = '';
    renderForm(formRegistration)
    let form = document.querySelector('.form')
    form.addEventListener('submit', onSubmitRegistrationForm)
}
export{onSubmitRegistrationForm,onSubmitEntryForm,renderForm,onRegistrationLinkClick}