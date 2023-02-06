import * as basicLightbox from 'basiclightbox';
import { API } from './service';
import { filmBoxRef } from './helpers';
import { storage } from './localStorage.js';
import Notiflix from 'notiflix';
import 'basiclightbox/dist/basicLightbox.min.css';

filmBoxRef.addEventListener('click', onContainerClick);

async function onContainerClick(evt) {
  if (evt.target.classList.contains('js-films-list')) {
    return;
  }

  try {
    const filmId = Number(
      evt.target.closest('.movie_card').attributes.getNamedItem('js-id').value
    );
    const movie = await API.fetchById(filmId);
    if (!movie)
      throw new Error('❌ Something go wrong, so we can`t load your film');
    const modal = createModal(renderModalMarcup(movie));
    modal.show();
    modalCloseByBackdropClick(modal);
    checkAndDisableButtons(filmId, movie);
  } catch (err) {
    Notiflix.Notify.failure(err.message);
    console.log(err.message);
  }
}

function checkAndDisableButtons(filmId, movie) {
  const btnWatched = document.querySelector('.movie_to-watched');
  const btnQueue = document.querySelector('.movie_to-queue');

  const setWatchedClick = e => {
    e.preventDefault();
    if (e.target.hasAttribute('js-disabled')) {
      Notiflix.Notify.warning(
        '🎬 Your film has already sucessfully been added'
      );
      return;
    }
    storage.addFilmToWatch(movie);
    btnWatched.setAttribute('js-disabled', '');
  };

  const setQueueClick = e => {
    e.preventDefault();
    if (e.target.hasAttribute('js-disabled')) {
      Notiflix.Notify.warning(
        '🎬 Your film has already sucessfully been added'
      );
      return;
    }
    storage.addFilmToQueue(movie);
    btnQueue.setAttribute('js-disabled', '');
  };

  if (storage.checkWatched(filmId)) btnWatched.setAttribute('js-disabled', '');
  if (storage.checkQueue(filmId)) btnQueue.setAttribute('js-disabled', '');

  btnWatched.addEventListener('click', setWatchedClick);
  btnQueue.addEventListener('click', setQueueClick);
}

function createModal(markup) {
  const modal = basicLightbox.create(markup, {
    onShow: modalCloseByEsc,
  });

  return modal;
}

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
}

function modalCloseByBackdropClick(instance) {
  const modalBtn = document.querySelector('.button-modal');
  const onBackdropClick = e => {
    e.preventDefault();
    instance.close();
    modalBtn.removeEventListener('click', onBackdropClick);
  };
  modalBtn.addEventListener('click', onBackdropClick);
}

function modalCloseByEsc(instance) {
  const onPressEsc = e => {
    if (e.code !== 'Escape') return false;
    instance.close();
    document.removeEventListener('keydown', onPressEsc);
  };
  document.addEventListener('keydown', onPressEsc);
}
