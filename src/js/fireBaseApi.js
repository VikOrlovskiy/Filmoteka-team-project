import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged , deleteUser} from 'firebase/auth';
import { getDatabase, ref, set, child, get  } from "firebase/database";
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
//=================  Firebase functions ===================================================
// ========== Auth State ====================
function authState(){
  onAuthStateChanged(auth, (user) => {
      if (user) {
          const uid = user.uid;
          console.log(uid)
          console.log(user.email)
          localStorage.setItem('userId',uid)
          // console.log(user.accessToken)
      } else {
        console.log('no user')
      }
    });
  }
// ==========login to Firebase====================
function RegistrationWithEmailAndPassword(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        localStorage.setItem('userData', JSON.stringify(user.accessToken,user.uid));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        console.log(errorCode)
        // ..
      });}
// ==========login to Firebase====================
function authWithEmailAndPassword(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        localStorage.setItem('userData', JSON.stringify(user.accessToken ,user.uid));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        console.log(errorCode)
      });
    }
// ========== log out====================
    function logOutAuthUser(){
      localStorage.clear()
      console.log('userOut')
      // signOut(auth)
    }
// ========== write User Data to Firebase====================
function writeUserData(userId, Collection) {
    set(ref(db, 'users/' + userId), {
      queue:Collection,
      Watched:Collection,
    });
  }
// ========== read User Data to Firebase====================
  function readUserData(userId){
    get(child(db, `users/${userId}`)).then((data) => {
        if (data.exists()) {
          console.log(data.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
  }
export{authWithEmailAndPassword,RegistrationWithEmailAndPassword,readUserData,writeUserData,logOutAuthUser,authState}