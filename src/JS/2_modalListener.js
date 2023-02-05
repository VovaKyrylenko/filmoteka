import * as basicLightbox from 'basiclightbox';
import { API } from './service';
import { filmBoxRef } from './helpers';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';

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
  createModal(renderModalMarcup(movie)).show();

  // Знімаємо слухач
  filmBoxRef.removeEventListener('click', onContainerClick);
}

// Створення модалки
function createModal(callback) {
  const modal = basicLightbox.create(callback, {
    onShow: modal => {
      modal.element().querySelector('.button-modal').onclick = modal.close;

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
      };

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
    <button class="button-modal" type="button" data-modal-close>
      <svg class="icon-close" width="14" height="14">
        <use href="./images/icons/icons.svg#icon-close"></use>
      </svg>
    </button>
    <div class="movie_description_card">
      <div class="div_movie_img">
        <img
          class="movie_img"
          src="https://image.tmdb.org/t/p/w500${poster_path}"
          alt="info of movie"
        />
      </div>
      <div class="movie_desc">
        <p class="movie_title">${original_title}</p>
        <table class="movie_characters">
          <tbody class="character_table">
            <tr>
              <td class="character">Vote / Votes</td>
              <td class="character_item"><span class="vote">${vote_average.toFixed(
                1
              )}</span>/${vote_count}</td>
            </tr>
            <tr>
              <td class="character">Popularity</td>
              <td class="character_item">${popularity.toFixed(1)}</td>
            </tr>
            <tr>
              <td class="character">Original Title</td>
              <td class="character_item">${original_title}</td>
            </tr>
            <tr>
              <td class="character">Genre</td>
              <td class="character_item">${genres[0].name}</td>
            </tr>
          </tbody>
        </table>
        <p class="movie_about">About</p>
        <p class="movie_about-description">
        ${overview}
        </p>
        <ul class="button_list">
          <li class="button_item">
            <button class="movie_to-watched" type="button">
              add to Watched
            </button>
          </li>
          <li class="button_item">
            <button class="movie_to-queue" type="button">add to queue</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>`;
};
