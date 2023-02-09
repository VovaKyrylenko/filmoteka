class FilmsLocalStorage {
  #WATCH_KEY;
  #QUEUE_KEY;

  constructor() {
    this.pageWatch = 1;
    this.pageQueue = 1;

    this.#WATCH_KEY = 'films_to_watch';
    this.#QUEUE_KEY = 'films_to_queue';

    const initArr = JSON.stringify([]);

    let filmsToWatch = JSON.parse(localStorage.getItem(this.#WATCH_KEY));
    let filmsToQueue = JSON.parse(localStorage.getItem(this.#QUEUE_KEY));

    if (!filmsToWatch) {
      localStorage.setItem(this.#WATCH_KEY, initArr);
      filmsToWatch = [];
    }
    if (!filmsToQueue) {
      localStorage.setItem(this.#QUEUE_KEY, initArr);
      filmsToQueue = [];
    }

    this.maxWatch = Math.ceil(filmsToWatch.length / 20);
    this.maxQueue = Math.ceil(filmsToQueue.length / 20);
  }

  incrementPageWatch() {
    if (this.pageWatch === this.maxWatch) {
      return;
    }
    this.pageWatch += 1;
  }

  decrementPageWatch() {
    if (this.pageWatch === 1) {
      return;
    }
    this.pageWatch -= 1;
  }

  incrementPageQueue() {
    if (this.pageQueue === this.maxQueue) {
      return;
    }
    this.pageQueue += 1;
  }

  decrementPageQueue() {
    if (this.pageQueue === 1) {
      return;
    }
    this.pageQueue -= 1;
  }

  getTwentyFromWatch() {
    const filmsJSON = localStorage.getItem(this.#WATCH_KEY);
    const filmsArr = JSON.parse(filmsJSON);
    const from = 20 * (this.pageWatch - 1);
    const to = 20 * this.pageWatch - 1;
    return filmsArr.slice(from, to);
  }

  getTwentyFromQueue() {
    const filmsJSON = localStorage.getItem(this.#QUEUE_KEY);
    const filmsArr = JSON.parse(filmsJSON);
    const from = 20 * (this.pageQueue - 1);
    const to = 20 * this.pageQueue - 1;
    return filmsArr.slice(from, to);
  }

  checkWatched(id) {
    const filmsJSON = localStorage.getItem(this.#WATCH_KEY);
    const filmsArr = JSON.parse(filmsJSON);
    return filmsArr.some(film => film.id == id);
  }

  checkQueue(id) {
    const filmsJSON = localStorage.getItem(this.#QUEUE_KEY);
    const filmsArr = JSON.parse(filmsJSON);
    return filmsArr.some(film => film.id == id);
  }

  addFilmToWatch(film) {
    const filmsJSON = localStorage.getItem(this.#WATCH_KEY);
    const filmsArr = JSON.parse(filmsJSON);
    filmsArr.unshift(film);
    const newFilmsJSON = JSON.stringify(filmsArr);
    localStorage.setItem(this.#WATCH_KEY, newFilmsJSON);
  }

  addFilmToQueue(film) {
    const filmsJSON = localStorage.getItem(this.#QUEUE_KEY);
    const filmsArr = JSON.parse(filmsJSON);
    filmsArr.unshift(film);
    const newFilmsJSON = JSON.stringify(filmsArr);
    localStorage.setItem(this.#QUEUE_KEY, newFilmsJSON);
  }

  delFilmFromWatch(id) {
    const filmsJSON = localStorage.getItem(this.#WATCH_KEY);
    let filmsArr = JSON.parse(filmsJSON);
    filmsArr = filmsArr.filter(film => film.id != id);
    const newFilmsJSON = JSON.stringify(filmsArr);
    localStorage.setItem(this.#WATCH_KEY, newFilmsJSON);
  }

  delFilmFromQueue(id) {
    const filmsJSON = localStorage.getItem(this.#QUEUE_KEY);
    let filmsArr = JSON.parse(filmsJSON);
    filmsArr = filmsArr.filter(film => film.id != id);
    const newFilmsJSON = JSON.stringify(filmsArr);
    localStorage.setItem(this.#QUEUE_KEY, newFilmsJSON);
  }

  setPageWatch(value) {
    this.pageWatch = value;
  }

  setPageQueue(value) {
    this.pageQueue = value;
  }

  resetPageWatch() {
    this.pageWatch = 1;
  }

  resetPageQueue() {
    this.pageWatch = 1;
  }

  getPageWatch() {
    return this.pageWatch;
  }

  getPageQueue() {
    return this.pageQueue;
  }

  getMaxWatch() {
    return this.maxWatch;
  }

  getMaxQueue() {
    return this.maxQueue;
  }
}

export const storage = new FilmsLocalStorage();
// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { initializeApp } from 'firebase/app';


import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoCV-uT6m4zkhe8p5jJA8T8Quk2bX8xX8",
  authDomain: "filmoteka-b315b.firebaseapp.com",
  projectId: "filmoteka-b315b",
  storageBucket: "filmoteka-b315b.appspot.com",
  messagingSenderId: "903917604658",
  appId: "1:903917604658:web:0382307da84868e996912b",
  measurementId: "G-WMMJWSVNYB"
};
firebase.initializeApp(firebaseConfig);
const login = document.getElementById('signin').addEventListener('click', signinUser);
const logout = document.getElementById('signout').addEventListener('click', signoutUser)

const provider = new GoogleAuthProvider();

function signinUser() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function (data){
          //console.log(data)
          document.getElementById('signin').classList.add('close');
          document.getElementById('signout').classList.remove('close');
          document.getElementById('googleUser').style.display = "block";
            renderGoogleUser(data);
        })
        .catch(function(error){
            console.log(error)
        })
    }

function signoutUser(){
    firebase.auth().signOut().then(() => {
        //console.log("Sign - out successful.");
        document.getElementById('signin').classList.remove('close');
      document.getElementById('signout').classList.add('close');
      document.getElementById('googleUser').style.display = "none";
    }).catch(error => {
          console.log(error)
        })
      }

      function renderGoogleUser(data){
          document.getElementById('googleUser').innerHTML = `
          <img class="user-img" src="${data.user.photoURL}">
        `
}