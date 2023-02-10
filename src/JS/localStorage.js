import Notiflix from 'notiflix';

class FilmsLocalStorage {
  #WATCH_KEY;
  #QUEUE_KEY;
  #BASE_URL;

  constructor() {
    this.#BASE_URL = 'https://63e6a9c1c8839ccc285c63f3.mockapi.io';

    this.pageWatch = 1;
    this.pageQueue = 1;

    this.#WATCH_KEY = 'films_to_watch';
    this.#QUEUE_KEY = 'films_to_queue';

    let objToWatch = JSON.parse(localStorage.getItem(this.#WATCH_KEY));
    let objToQueue = JSON.parse(localStorage.getItem(this.#QUEUE_KEY));

    if (!objToWatch) objToWatch = {};
    if (!objToQueue) objToQueue = {};

    const { email } = JSON.parse(localStorage.get('account'));
    if (!email) {
      Notiflix.Notify.warning('➡ You have to sign in first');
      console.log('➡ You have to sign in first');
      return;
    }

    this.email = email;

    if (!Object.keys(objToWatch).length) {
      const newObj = {};
      newObj[email] = [];
      localStorage.setItem(this.#WATCH_KEY, JSON.stringify(newObj));
      localStorage.setItem(this.#QUEUE_KEY, JSON.stringify(newObj));
      this.maxWatch = 0;
      this.maxQueue = 0;
    } else {
      const isEmailInStorage = Object.keys(objToWatch).some(
        locEmail => locEmail == email
      );
      if (!isEmailInStorage) {
        const filmsToWatchArr = objToWatch[email];
        const filmsToQueuehArr = objToQueue[email];
        this.maxWatch = Math.ceil(filmsToWatchArr.length / 20);
        this.maxQueue = Math.ceil(filmsToQueuehArr.length / 20);
      } else {
      }
    }
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
    const objToWatch = JSON.parse(localStorage.getItem(this.#WATCH_KEY));
    const filmsArr = objToWatch[this.email];
    const from = 20 * (this.pageWatch - 1);
    const to = 20 * this.pageWatch - 1;
    return filmsArr.slice(from, to);
  }

  getTwentyFromQueue() {
    const objToQueue = JSON.parse(localStorage.getItem(this.#QUEUE_KEY));
    const filmsArr = objToQueue[this.email];
    const from = 20 * (this.pageQueue - 1);
    const to = 20 * this.pageQueue - 1;
    return filmsArr.slice(from, to);
  }

  checkWatched(id) {
    const objToWatch = JSON.parse(localStorage.getItem(this.#WATCH_KEY));
    const filmsArr = objToWatch[this.email];
    return filmsArr.some(film => film.id == id);
  }

  checkQueue(id) {
    const objToQueue = JSON.parse(localStorage.getItem(this.#QUEUE_KEY));
    const filmsArr = objToQueue[this.email];
    return filmsArr.some(film => film.id == id);
  }

  addFilmToWatch(film) {
    const objToWatch = JSON.parse(localStorage.getItem(this.#WATCH_KEY));
    objToWatch[this.email].unshift(film);
    const newFilmsJSON = JSON.stringify(objToWatch);
    localStorage.setItem(this.#WATCH_KEY, newFilmsJSON);
  }

  addFilmToQueue(film) {
    const objToQueue = JSON.parse(localStorage.getItem(this.#QUEUE_KEY));
    objToQueue[this.email].unshift(film);
    const newFilmsJSON = JSON.stringify(objToQueue);
    localStorage.setItem(this.#QUEUE_KEY, newFilmsJSON);
  }

  delFilmFromWatch(id) {
    const objToWatch = JSON.parse(localStorage.getItem(this.#WATCH_KEY));
    objToWatch[this.email] = objToWatch[this.email].filter(
      film => film.id != id
    );
    const newFilmsJSON = JSON.stringify(objToWatch);
    localStorage.setItem(this.#WATCH_KEY, newFilmsJSON);
  }

  delFilmFromQueue(id) {
    const objToQueue = JSON.parse(localStorage.getItem(this.#QUEUE_KEY));
    objToQueue[this.email] = objToQueue[this.email].filter(
      film => film.id != id
    );
    const newFilmsJSON = JSON.stringify(objToQueue);
    localStorage.setItem(this.#QUEUE_KEY, newFilmsJSON);
  }

  setPageWatch(value) {
    this.pageWatch = value;
  }

  setPageQueue(value) {
    this.pageQueue = value;
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
