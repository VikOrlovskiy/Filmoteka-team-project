import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut} from 'firebase/auth';
import { getDatabase, ref, set, child, get  } from "firebase/database";
import Notiflix from 'notiflix';
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
const db = getDatabase();
const dbRef = ref(getDatabase());
//=================  Firebase functions ===================================================
// ========== Auth State ====================
function authState(){
  onAuthStateChanged(auth, (user) => {
      if (user) {
          let userData = {'accessToken':user.accessToken ,'uid': user.uid}
          localStorage.setItem('userData', JSON.stringify(userData));
      } else {
        localStorage.clear()
        console.log('no user')
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
        const errorCode = error.code;
        const errorMessage = error.message;
        Notiflix.Notify.failure(`${error.message}`);
      });}
// ==========login to Firebase====================
function authWithEmailAndPassword(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Notiflix.Notify.success('Authorization was successful');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Notiflix.Notify.failure(error.message);
      });
    }
// ========== log out====================
    function logOutAuthUser(){
      localStorage.clear()
      signOut(auth)
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
    .then(data => console.log('WriteUserData'));
}
// ========== Read User Data====================
// onCkickReadUserData(dataUser.accessToken,e.target.dataset.action,dataUser.uid)
function onCkickReadUserData(accessToken,nameCollection,uid) {
  return fetch(
    `${DATABASEURL}/${uid}/${nameCollection}.json?auth=${accessToken}`,
  )
    .then(response => response.json())
    .then(response => { return response})
}
export{onCkickWriteUserData,onCkickReadUserData,authWithEmailAndPassword,RegistrationWithEmailAndPassword,logOutAuthUser,authState}