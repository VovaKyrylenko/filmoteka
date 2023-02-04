import { renderFilms } from './JS/renderFunctions';
import { FilmAPI } from './JS/service';

const list = document.querySelector('.js-films-list');
const api = new FilmAPI();
const popularFilmsList = api.fetchPopularMovies();
console.log('popularFilmsList:', popularFilmsList);
renderFilms(popularFilmsList[0], list);
