import { renderFilms } from './JS/renderFunctions';
import { API } from './JS/service';

(async () => {
  const list = document.querySelector('.js-films-list');
  const popularFilmsList = await API.fetchPopularMovies();
  renderFilms(popularFilmsList, list);
})();
