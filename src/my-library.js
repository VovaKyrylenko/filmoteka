import { filmBoxRef, listButton } from './JS/helpers';
import { storage } from './JS/localStorage';
import {
  renderFilms,
  pagination,
  renderPagination,
  listClickHandlerWatch,
  listClickHandlerQueue,
} from './JS/renderFunctions';
import { spiner } from './JS/spiner.js';

listButton.addEventListener('click', onClick);

function onClick(evt) {
  if (evt.target.classList.contains('js-watched')) {
    spiner.start();
    const films = storage.getTwentyFromWatch();
    console.log(films);
    renderFilms(films, filmBoxRef);
    const paginationArr = pagination(
      storage.getPageWatch(),
      storage.getMaxWatch()
    );
    renderPagination(paginationArr, filmBoxRef, listClickHandlerWatch);
    spiner.stop();
  } else if (evt.target.classList.contains('js-queue')) {
    spiner.start();
    renderFilms(storage.getTwentyFromQueue(), filmBoxRef);
    const paginationArr = pagination(
      storage.getPageQueue(),
      storage.getMaxQueue()
    );
    renderPagination(paginationArr, filmBoxRef, listClickHandlerQueue);
    spiner.stop();
  } else return;
}
