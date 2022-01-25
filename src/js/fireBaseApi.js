import Refs from "./Refs";
import Notiflix from 'notiflix';
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut} from 'firebase/auth';

const DATABASEURL = 'https://filmoteka2-11906-default-rtdb.europe-west1.firebasedatabase.app//users/'
//================== Your web app's Firebase configuration ================================
const firebaseConfig = {
    apiKey: "AIzaSyBR83s7HPzADcrtRoUE2ndSXGar5JAgfWk",
    authDomain: "filmoteka2-11906.firebaseapp.com",
    projectId: "filmoteka2-11906",
    storageBucket: "filmoteka2-11906.appspot.com",
    messagingSenderId: "12870537930",
    appId: "1:12870537930:web:d7a02c2d3d10fd4e9f5a33",
    databaseURL: "https://filmoteka2-11906-default-rtdb.europe-west1.firebasedatabase.app/"
  };
//================= Initialize Firebase ===================================================
const app = initializeApp(firebaseConfig);
const auth = getAuth();
//=================  Firebase functions ===================================================
// ========== Auth State ====================
function authState(){
  onAuthStateChanged(auth, (user) => {
      if (user) {
          let userData = {'accessToken':user.accessToken ,'uid': user.uid}
          localStorage.setItem('userData', JSON.stringify(userData));
          Refs.userGalleryFunctions.classList.remove('is-hidden');
          Refs.logOutButton.classList.remove('is-hidden');
          Refs.logInButton.classList.add('is-hidden');
      } else {
        Refs.userGalleryFunctions.classList.add('is-hidden');
        Refs.logOutButton.classList.add('is-hidden');
        Refs.logInButton.classList.remove('is-hidden');
        localStorage.clear()
      }
    });
  }
// ==========login to Firebase====================
function RegistrationWithEmailAndPassword(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       Notiflix.Notify.success('Registration was successful');
      })
      .catch((error) => {
        Notiflix.Notify.failure("email already registered write another one")
      });}
// ==========login to Firebase====================
function authWithEmailAndPassword(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Notiflix.Notify.success('Authorization was successful');
      })
      .catch((error) => {
        Notiflix.Notify.failure("check the correct password");
      });
    }
// ========== log out====================
    function logOutAuthUser(){
      localStorage.clear()
      signOut(auth)
      location.reload()
    }
// ========== Write User Data====================
function onCkickWriteUserData(accessToken,nameCollection,uid,Collection) {
  return fetch(
    `${DATABASEURL}${uid}/${nameCollection}.json?auth=${accessToken}`,
    {
      method: 'POST',
      body: JSON.stringify(Collection),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
}
// ========== Read User Data====================
function onCkickReadUserData(accessToken,nameCollection,uid) {
  return fetch(
    `${DATABASEURL}/${uid}/${nameCollection}.json?auth=${accessToken}`,
  )
    .then(response => response.json())
    .then(response => { return response})
}

function onCkickRemoveUserData(accessToken,nameCollection,fireBaseWriteId,uid) {
 return fetch( `${DATABASEURL}/${uid}/${nameCollection}/${fireBaseWriteId}.json?auth=${accessToken}`, {
  method: "DELETE",
})
  .then(() => Notiflix.Notify.success('film is deleted'))
  .catch(error => console.log("Error:", error));
}
export{onCkickWriteUserData,onCkickReadUserData,authWithEmailAndPassword,RegistrationWithEmailAndPassword,logOutAuthUser,authState,onCkickRemoveUserData}