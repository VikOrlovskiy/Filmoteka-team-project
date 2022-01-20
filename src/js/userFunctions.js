import { authWithEmailAndPassword, RegistrationWithEmailAndPassword,logOutAuthUser,authState,readUserData,writeUserData} from "./fireBaseApi";
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
let dataUser = JSON.parse(localStorage.getItem('userData'))
console.log(dataUser.uid)
if(dataUser !== null){
    writeUserData(dataUser.uid,[34545667788,345678,34324234])
    // writeToFBHundler(dataUser.accessToken,'films',dataUser.uid,[34545667788,345678,34324234])
}
// function writeToFBHundler(accessToken,nameCollection,uid,Collection) {
//     console.log(nameCollection)
//     return fetch(
//       `https://filmoteka2-11906-default-rtdb.europe-west1.firebasedatabase.app//${uid}/${nameCollection}.json?auth=${accessToken}`,
//       {
//         method: 'POST',
//         body: JSON.stringify(Collection),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     )
//       .then(response => response.json())
//       .then(data => console.log(data));
//   }
  if(dataUser !== null){
    // readUserData(dataUser.uid)
    //    readFromFBHundler(dataUser.accessToken,'films',dataUser.uid)
}

//   function readFromFBHundler(accessToken,nameCollection,uid) {
//     return fetch(
//       `https://filmoteka2-11906-default-rtdb.europe-west1.firebasedatabase.app//${uid}/${nameCollection}.json?auth=${accessToken}`,
//     )
//       .then(response => response.json())
//       .then(response => console.log(response))
//   }