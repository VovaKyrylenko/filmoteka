import { renderFilms } from './JS/renderFunctions';
import { API } from './JS/service';

const formRef = document.querySelector('#search-form');
const list = document.querySelector('.js-films-list');
(async () => {
  const popularFilmsList = await API.fetchPopularMovies();
  renderFilms(popularFilmsList, list);
})();

formRef.addEventListener('submit', onSubmit);

async function onSubmit(evt) {
  evt.preventDefault();
  API.setSearchQuery(evt.target[0].value);
  const variable = await API.fetchKeyword();
  renderFilms(variable, list);
}
