// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCoCV-uT6m4zkhe8p5jJA8T8Quk2bX8xX8',
  authDomain: 'filmoteka-b315b.firebaseapp.com',
  projectId: 'filmoteka-b315b',
  storageBucket: 'filmoteka-b315b.appspot.com',
  messagingSenderId: '903917604658',
  appId: '1:903917604658:web:0382307da84868e996912b',
  measurementId: 'G-WMMJWSVNYB',
};

firebase.initializeApp(firebaseConfig);
const login = document
  .getElementById('signin')
  .addEventListener('click', signinUser);
const logout = document
  .getElementById('signout')
  .addEventListener('click', signoutUser);

// const provider = new GoogleAuthProvider();

function signinUser() {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then(function (data) {
      document.getElementById('signin').classList.add('close');
      document.getElementById('signout').classList.remove('close');
      document.getElementById('googleUser').style.display = 'block';
      renderGoogleUser(data);
      sessionStorage.setItem('email', data.user.email);
      document.querySelector('.firebases').insertAdjacentHTML("beforebegin", '<li><a class="nav__link nav__link--library" href="my-library.html">MY LIBRARY</a></li>')
    })
    .catch(function (error) {
      console.log(error);
    });
}

function signoutUser() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      //console.log("Sign - out successful.");
      document.getElementById('signin').classList.remove('close');
      document.getElementById('signout').classList.add('close');
      document.getElementById('googleUser').style.display = 'none';
      document.querySelector('.nav__link--library').remove();
    })
    .catch(error => {
      console.log(error);
    });
}

function renderGoogleUser(data) {
  document.getElementById('googleUser').innerHTML = `
          <img class="user-img" src="${data.user.photoURL}">
        `;
}
