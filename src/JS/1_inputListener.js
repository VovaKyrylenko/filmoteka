import { filmBoxRef, formRef } from './helpers';
import { API } from './service';
import { renderFilms, pagination, renderPagination } from './renderFunctions';
import { spiner } from './spiner.js';

(async () => {
  spiner.start();
  const popularFilmsList = await API.fetchPopularMovies();
  renderFilms(popularFilmsList, filmBoxRef);
  const paginationArr = pagination(API.getPage(), API.getMax());
  renderPagination(paginationArr, filmBoxRef);
  spiner.stop();
})();

async function onSubmit(e) {
  e.preventDefault();
  const value = e.target[0].value;
  if (value) {
    spiner.start();
    API.setSearchQuery(value);
    const filmListData = await API.fetchKeyword();
    renderFilms(filmListData, filmBoxRef);
    const paginationArr = pagination(API.getPage(), API.getMax());
    renderPagination(paginationArr, filmBoxRef);
    spiner.stop();
  }
}

formRef.addEventListener('submit', onSubmit);
