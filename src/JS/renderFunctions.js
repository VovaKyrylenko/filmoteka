import { genreInfo } from './helpers';

import { filmBoxRef } from './helpers';
import { FilmAPI } from './service';
import { renderFilms } from './renderFunctions';
export function renderFilms(movies, movieListEl) {
  const genresInfo = JSON.parse(genreInfo);

  movieListEl.innerHTML = movies
    .map(movie => {
      genresIds = movie.genre_ids;
      // створення списку жанрів
      console.log('genresIds.length < 3:', genresIds.length < 3);
      const genresList = [];
      if (genresIds.length > 3) {
        genresIds = genresIds.slice(0, 2);
        genresIds.push(9999);
        console.log('genresIds:', genresIds);
      }
      genresIds.length
        ? genresIds.forEach(el => {
          const findGenre = genresInfo.genres.find(opt => opt.id === el);
          let elem = ''
          if(findGenre){
            elem = findGenre.name
          } 
            genresList.push(elem);
          })
        : genresList.push('Another genre');
      genres = genresList.join(', ');

      // створення url постерів
      const imgUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://padletuploads.blob.core.windows.net/prod/338313757/xv9cNVhJOnCldshv-zjMjA/f41906143bc5eb004cac88418b2a97a7.jpeg';

      // виділення року із дати
      const date = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : '-';

      // розмітка картки
      return `
                <li class="movie_card" js-id=${movie.id}>
                    <img class="movie_card_img" src="${imgUrl}" alt="film" />
                    <p class="movie_card_title">${movie.original_title}</p>
                    <div class="movie_card_desc">
                        <p class="movie_card_ganres">${genres}</p>
                        <p class="movie_card_year">${date} year</p>
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


const list = document.querySelector('.pagination');
list.addEventListener('click', listClickHandler);

const paginationArr = pagination(15, 20);
// console.log(paginationArr)
//розмітка для стрілочок
const leftArrowMarkup = `
<li class="pagination__item item-left-arrow">
 <a href="" class="pagination__left-arrow pagination__link">
 </a>
 </li>
 `;
const rightArrowMarkup = `
<li class="pagination__right-arrow pagination__item item-right-arrow"">
<a href="" class="pagination__right-arrow pagination__link" data="rightArrow">
</a>
</li>
`;
//масив чисел
const numbersArr = paginationArr
  .filter(el => Number(el) === Number(el))
  .map(el => Number(el));
const firstNumber = Math.min(...numbersArr);
const lastNumber = Math.max(...numbersArr);

markupRender(paginationArr);
//рендер розмітки
function markupRender(array) {
  console.log('render');
  array.map(page => {
    if (page === '<-') {
      list.insertAdjacentHTML('beforeend', leftArrowMarkup);
    } else if (page === '->') {
      list.insertAdjacentHTML('beforeend', rightArrowMarkup);
    } else if (page.includes('active')) {
      const updatedPageName = page.replace('active', '');
      list.insertAdjacentHTML(
        'beforeend',
        `<li class="pagination__item pagination__item--isActive"> 
        <a href="" class="pagination__link">${updatedPageName}</a>
        </li>`
      );
    } else if (
      Number(page) === firstNumber ||
      Number(page) === lastNumber ||
      page === '...'
    ) {
      list.insertAdjacentHTML(
        'beforeend',
        `<li class="pagination__item pagination__item--desktop">
        <a href="" class="pagination__link">${page}</a>
        </li>
        `
      );
    } else {
      list.insertAdjacentHTML(
        'beforeend',
        `<li class="pagination__item"><a href="" class="pagination__link">${page}</a></li>`
      );
    }
  });
}
const film = new FilmAPI();
console.log(film)

let rightArrowEl = '';

const rightArrow = document.querySelector('.pagination__right-arrow');
rightArrow.addEventListener('click', rightArrowHandler);
function rightArrowHandler(event) {
  rightArrowEl = event.currentTarget.classList[0];
}

function listClickHandler(event) {
  event.preventDefault();
  const element = event.target;
  const pageValue = event.target.textContent;
  const trimedValue = pageValue.trim();

  if(element.classList[0] === 'pagination'){
    return
  }
  //перевірка на крапочки
else if (pageValue === '...') {
  }
  //перевірка на цифри
  else if (trimedValue === pageValue) {
    if (Number(pageValue) < film.getMax() + 1) {
    film.setPage(Number(pageValue))
    console.log(film);

    searchQueryCheck();
    }
  }
  //перевірка на 2 стрілку
  else if (element.classList[0] === 'pagination__right-arrow') {
    film.incrementPage();
    console.log(film);
    
      searchQueryCheck();

  }
  //1 стрілка
  else {
    film.decrementPage();
    console.log(film);

    searchQueryCheck();
    
  }
}

async function searchQueryCheck() {
    film.searchQuery = '';
    // console.log(film)
  
    if (film.getSearchQuery() === '') {
      const films = await film.fetchPopularMovies();
      console.log('films:', films);
    //   console.log(film);

renderFilms(films, filmBoxRef)
    } else {
      const films = await film.fetchKeyword();
      console.log('films: ', films);
      console.log(film);

renderFilms(films, filmBoxRef)

    }
  }
searchQueryCheck();



