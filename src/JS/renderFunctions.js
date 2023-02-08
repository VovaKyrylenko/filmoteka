import { genreInfo } from './helpers';
import { filmBoxRef } from './helpers';
import { API } from './service';
import { storage } from './localStorage';

export function renderFilms(movies, movieListEl) {
  const genresInfo = JSON.parse(genreInfo);

  movieListEl.innerHTML = movies
    .map(movie => {
      let genres = [];
      if (movie.genre_ids) {
        genresIds = movie.genre_ids;
        // створення списку жанрів
        const genresList = [];
        if (genresIds.length > 3) {
          genresIds = genresIds.slice(0, 2);
          genresIds.push(9999);
        }
        genresIds.length
          ? genresIds.forEach(el => {
              elem = genresInfo.genres.find(opt => opt.id === el).name;
              genresList.push(elem);
            })
          : genresList.push('Another genre');
        genres = genresList.join(', ');
      } else if (movie.genres) {
        if (!movie.genres.length) genres.push('Another genre');
        genres = movie.genres.map(el => el.name);
        if (genres.length > 3) genres = genres.slice(0, 2);
        genres = genres.join(', ');
      }
      // створення url постерів
      const imgUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://github.com/VovaKyrylenko/filmoteka/blob/main/src/images/photo_2023-02-05_18-38-12.jpg';

      // виділення року із дати
      const date = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : '-';

      // розмітка картки
      return `
                <li class="movie_card" js-id=${movie.id}>
                <div class="img__thumb" style="background-image:url(${imgUrl})"></div>
                    <p class="movie_card_title">${movie.original_title}</p>
                    <div class="movie_card_desc">
                        <p class="movie_card_ganres">${genres}</p>
                        <p class="movie_card_year">| ${date}</p>
                        <span class="movie_card_rating">${movie.vote_average}</span>
                        </div>
                </li>`;
    })
    .join('');
}

export function pagination(activePage, totalPages) {
  if (typeof totalPages !== 'number' || typeof activePage !== 'number') {
    return;
  }
  if (totalPages < activePage || totalPages <= 0 || activePage <= 0) {
    return;
  }

  if (totalPages === 1) {
    return ['1active'];
  }

  const arr = [
    activePage - 2,
    activePage - 1,
    activePage,
    activePage + 1,
    activePage + 2,
  ];

  const filteredArr = arr.filter(num => num > 1 && num < totalPages);
  const newArr = [1, totalPages];

  const includeThreeLeft = activePage === 5;
  const includeThreeRight = activePage === totalPages - 4;
  const includeLeftDots = activePage > 5;
  const includeRightDots = activePage < totalPages - 4;

  if (includeThreeLeft) filteredArr.unshift(2);
  if (includeThreeRight) filteredArr.push(totalPages - 1);

  if (includeLeftDots) {
    filteredArr.unshift('...');
    newArr.unshift('<-');
  }

  if (includeRightDots) {
    filteredArr.push('...');
    newArr.push('->');
  }

  if (newArr.includes('<-') || newArr.length === 4) {
    newArr.splice(2, 0, ...filteredArr);
  } else if (newArr.includes('->')) {
    newArr.splice(1, 0, ...filteredArr);
  } else {
    newArr.splice(1, 0, ...filteredArr);
  }

  const result = newArr.map(el => {
    if (typeof el === 'number') {
      if (el === activePage) {
        el = el + 'active';
      }
      el = String(el);
    }
    return el;
  });

  return result;
}

export function renderPagination(paginationArr, filmBoxRef, callback) {
  const paginationUl = `<ul class="pagination"></ul>`;
  let paginationUlRef = document.querySelector('.pagination');
  if (paginationUlRef) {
    paginationUlRef.remove();
  }

  filmBoxRef.insertAdjacentHTML('afterend', paginationUl);
  paginationUlRef = document.querySelector('.pagination');

  const leftArrowMarkup = `
    <li class="pagination__item item-left-arrow">
      <button  class="pagination__left-arrow pagination__link" aria-label="left-arrow">
      </button>
    </li>
  `;
  const rightArrowMarkup = `
    <li class="pagination__right-arrow pagination__item item-right-arrow"">
      <button  class="pagination__right-arrow pagination__link" data="rightArrow" aria-label="right-arrow>
      </button>
    </li>
  `;

  const numbersArr = paginationArr
    .filter(el => Number.parseInt(el) === Number.parseInt(el))
    .map(el => Number.parseInt(el));
  const firstNumber = Math.min(...numbersArr);
  const lastNumber = Math.max(...numbersArr);

  paginationArr.forEach(page => {
    if (page === '<-') {
      paginationUlRef.insertAdjacentHTML('beforeend', leftArrowMarkup);
    } else if (page === '->') {
      paginationUlRef.insertAdjacentHTML('beforeend', rightArrowMarkup);
    } else if (page.includes('active')) {
      const updatedPageName = page.replace('active', '');
      paginationUlRef.insertAdjacentHTML(
        'beforeend',
        `<li class="pagination__item pagination__item--isActive"> 
        <button  class="pagination__link" aria-label="pagination-item>${updatedPageName}</button>
        </li>`
      );
    } else if (page === '...') {
      paginationUlRef.insertAdjacentHTML(
        'beforeend',
        `<li class="pagination__item pagination__item--desktop pagination__item--dots" >
            <button class="pagination__link" aria-label="pagination-link">${page}</button>
          </li>
        `
      );
    } else if (Number(page) === firstNumber || Number(page) === lastNumber) {
      paginationUlRef.insertAdjacentHTML(
        'beforeend',
        `<li class="pagination__item pagination__item--desktop">
        <button class="pagination__link" aria-label="pagination-link">${page}</button>
        </li>
        `
      );
    } else {
      paginationUlRef.insertAdjacentHTML(
        'beforeend',
        `<li class="pagination__item"><button class="pagination__link" aria-label="pagination-link">${page}</button></li>`
      );
    }
  });

  paginationUlRef.addEventListener('click', callback);
}

export function listClickHandlerMain(event) {
  event.preventDefault();
  const element = event.target;
  const pageValue = event.target.textContent;
  const trimedValue = pageValue.trim();

  const searchQueryCheck = async () => {
    let films;
    if (!API.getSearchQuery()) films = await API.fetchPopularMovies();
    else films = await API.fetchKeyword();
    renderFilms(films, filmBoxRef);
  };

  if (element.classList[0] === 'pagination') {
    return;
  }

  filmBoxRef.innerHTML = '';

  if (trimedValue === pageValue) {
    if (Number(pageValue) < API.getMax() + 1) {
      API.setPage(Number(pageValue));
      searchQueryCheck();
    }
  } else if (element.classList[0] === 'pagination__right-arrow') {
    API.incrementPage();
    searchQueryCheck();
  } else {
    API.decrementPage();
    searchQueryCheck();
  }

  const paginationArr = pagination(API.getPage(), API.getMax());
  renderPagination(paginationArr, filmBoxRef);
}

export function listClickHandlerWatch(event) {
  event.preventDefault();
  const element = event.target;
  const pageValue = event.target.textContent;
  const trimedValue = pageValue.trim();

  if (element.classList[0] === 'pagination') {
    return;
  }

  filmBoxRef.innerHTML = '';

  if (trimedValue === pageValue) {
    if (Number(pageValue) < storage.getMaxWatch() + 1) {
      storage.setPageWatch(Number(pageValue));
      const films = storage.getTwentyFromWatch();
      renderFilms(films, filmBoxRef);
    }
  } else if (element.classList[0] === 'pagination__right-arrow') {
    storage.incrementPageWatch();
    const films = storage.getTwentyFromWatch();
    renderFilms(films, filmBoxRef);
  } else {
    storage.decrementPageWatch();
    const films = storage.getTwentyFromWatch();
    renderFilms(films, filmBoxRef);
  }

  const paginationArr = pagination(
    storage.getPageWatch(),
    storage.getMaxWatch()
  );
  renderPagination(paginationArr, filmBoxRef);
}

export function listClickHandlerQueue(event) {
  event.preventDefault();
  const element = event.target;
  const pageValue = event.target.textContent;
  const trimedValue = pageValue.trim();

  if (element.classList[0] === 'pagination') {
    return;
  }

  filmBoxRef.innerHTML = '';

  if (trimedValue === pageValue) {
    if (Number(pageValue) < storage.getMaxQueue() + 1) {
      storage.setPageQueue(Number(pageValue));
      const films = storage.getTwentyFromQueue();
      renderFilms(films, filmBoxRef);
    }
  } else if (element.classList[0] === 'pagination__right-arrow') {
    storage.incrementPageQueue();
    const films = storage.getTwentyFromQueue();
    renderFilms(films, filmBoxRef);
  } else {
    storage.decrementPageQueue();
    const films = storage.getTwentyFromQueue();
    renderFilms(films, filmBoxRef);
  }

  const paginationArr = pagination(
    storage.getPageQueue(),
    storage.getMaxQueue()
  );
  renderPagination(paginationArr, filmBoxRef);
}
