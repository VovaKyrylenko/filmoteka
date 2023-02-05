import * as basicLightbox from 'basiclightbox';
import { API } from './service';
import { filmBoxRef } from './helpers';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import svgsSprite from '../images/icons/icons.svg';

filmBoxRef.addEventListener('click', onContainerClick);

async function onContainerClick(evt) {
  // Перевіряємо чи клікаєм куди треба
  if (evt.target.classList.contains('js-films-list')) {
    return;
  }

  // Знаходимо id вибраного фільму
  const filmId = Number(
    evt.target.closest('.movie_card').attributes.getNamedItem('js-id').value
  );

  // Фетчимо об'єкт фільму
  const movie = await API.fetchById(filmId);

  // // Створюємо і показуємо модалку
  const instance = createModal(renderModalMarcup(movie));
  instance.show();

  // Знімаємо слухач
  filmBoxRef.removeEventListener('click', onContainerClick);
}

// Створення модалки
function createModal(markup) {
  const modal = basicLightbox.create(markup, {
    onShow: modal => {
      modal.element().querySelector('.button__modal').onclick = modal.close;

      modalCloseByEsc();

      modalCloseByBackdropClick();

      document.body.style.overflow = 'hidden';

      filmBoxRef.addEventListener('click', onContainerClick);
    },

    onClose: () => {
      filmBoxRef.addEventListener('click', onContainerClick);

      document.body.style.overflow = 'visible';
    },
  });

  const modalCloseByBackdropClick = instance => {
    const onBackdropClick = e => {
      if (e.target.attributes.getNamedItem('data-modal')) {
        modal.close();
        document.removeEventListener('click', onBackdropClick);
      }
    };
    document.addEventListener('click', onBackdropClick);
  };

  const modalCloseByEsc = () => {
    const onPressEsc = e => {
      if (e.code !== 'Escape') {
        return false;
      }

      modal.close();
      document.removeEventListener('keydown', onPressEsc);
    };
    document.addEventListener('keydown', onPressEsc);
  };

  return modal;
}

// Рендер розмітки
function renderModalMarcup({
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) {
  return `<div class="backdrop" data-modal>
  <div class="modal">
    <button class="button__modal" type="button" data-modal-close>
      <svg class="icon__close" width="14" height="14">
        <use href="${svgsSprite}#close"></use>
      </svg>
    </button>
    <div class="movie__description-card">
      <div class="div__movie-img" >
        <img
          class="movie__img"
          src="https://image.tmdb.org/t/p/w500${poster_path}"
          alt="info of movie"
        />
      </div>
      <div class="movie__desc">
        <p class="movie__title">${original_title}</p>
        <table class="movie__characters">
          <tbody class="character__table">
            <tr>
              <td class="character">Vote / Votes</td>
              <td class="character__item "><span class="vote">${vote_average.toFixed(
                1
              )}</span><span class="vote__slash">/</span><span class="vote__grey">${vote_count}</span></td>
            </tr>
            <tr>
              <td class="character">Popularity</td>
              <td class="character__item">${popularity.toFixed(1)}</td>
            </tr>
            <tr>
              <td class="character">Original Title</td>
              <td class="character__item">${original_title}</td>
            </tr>
            <tr>
              <td class="character">Genre</td>
              <td class="character__item">${genres[0].name}</td>
            </tr>
          </tbody>
        </table>
        <p class="movie__about">About</p>
        <p class="movie__about-description">
        ${overview}
        </p>
        <ul class="button__list">
          <li class="button__item">
            <button class="movie__to-watched" type="button">
              add to Watched
            </button>
          </li>
          <li class="button__item">
            <button class="movie__to-queue" type="button">add to queue</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>`;
}
