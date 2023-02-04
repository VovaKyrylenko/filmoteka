import { FilmAPI } from './service';
import { filmBoxRef } from './helpers';
import { inputRef } from './helpers';
import { renderFilms, pagination, renderPagination } from './renderFunctions';
// import { spiner } from './spiner.js';
async function test() {
    // spiner start();
    const api = new FilmAPI();
   // Get popular films by default
  let data = await api.fetchPopularMovies();
    renderFilms(data, filmBoxRef);
    // spiner.stop();

  // Search for films based on input
  inputRef.addEventListener('input', async (event) => {
    // spiner start();
    api.resetPage();
    api.setSearchQuery(event.target.value);
    data = await api.fetchKeyword();
    renderFilms(data, filmBoxRef);
    // spiner.stop();
    // const paginationArr = pagination(api.getPage(), api.getMax());
    // renderPagination(paginationArr, filmBoxRef);
  });
}

test();