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
    let filmsToQueue = JSON.parse(localStorage.getItem(this.#WATCH_KEY));

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

  incrementPage() {
    if (this.page === this.max) {
      return;
    }
    this.page += 1;
  }

  decrementPage() {
    if (this.page === 1) {
      return;
    }
    this.page -= 1;
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
