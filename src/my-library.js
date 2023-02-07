import { filmBoxRef, listButton } from './JS/helpers';
import { storage } from './JS/localStorage';
import { renderFilms } from './JS/renderFunctions';
listButton.addEventListener('click', onClick);
function onClick(evt) {
  if (evt.target.classList.contains('js-watched')) {
    spiner.start();
    const filmListData = storage.getTwentyFromWatch();
    renderFilms(filmListData, filmBoxRef);
    const paginationArr = pagination(storage.getPage(), storage.getMax());
    renderPagination(paginationArr, filmBoxRef);
    spiner.stop();
  }
  if (evt.target.classList.contains('js-queue')) {
    renderFilms(storage.getTwentyFromQueue(), filmBoxRef);
  }
}
