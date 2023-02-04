import { filmBoxRef } from './helpers';
import { FilmAPI } from './service';
import { renderFilms, pagination, renderPagination } from './renderFunctions';

async function test() {
  console.log('XXX');

  const api = FilmAPI;
  api.setSearchQuery('red');
  api.incrementPage();
  const data = await api.fetchKeyword();
  console.log(data);
  renderFilms(data, filmBoxRef);

  const paginationArr = pagination(api.getPage(), api.getMax());
  renderPagination(paginationArr, filmBoxRef);
}

test();
