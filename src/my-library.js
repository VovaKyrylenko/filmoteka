import { filmBoxRef, listButton } from './JS/helpers';
import { storage } from './JS/localStorage';
import { renderFilms } from './JS/renderFunctions';
storage.addFilmToWatch({
  adult: false,
  backdrop_path: '/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg',
  genre_ids: [28, 12, 878],
  id: 505642,
  original_language: 'en',
  original_title: 'Black Panther: Wakanda Forever',
  overview:
    'Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.',
  popularity: 7658.731,
  poster_path: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
  release_date: '2022-11-09',
  title: 'Black Panther: Wakanda Forever',
  video: false,
  vote_average: 7.5,
  vote_count: 2389,
});
storage.addFilmToQueue({
  adult: false,
  backdrop_path: '/q2fY4kMXKoGv4CQf310MCxpXlRI.jpg',
  genre_ids: [878, 27, 35],
  id: 536554,
  original_language: 'en',
  original_title: 'M3GAN',
  overview:
    "A brilliant toy company roboticist uses artificial intelligence to develop M3GAN, a life-like doll programmed to emotionally bond with her newly orphaned niece. But when the doll's programming works too well, she becomes overprotective of her new friend with terrifying results.",
  popularity: 3387.402,
  poster_path: '/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg',
  release_date: '2022-12-28',
  title: 'M3GAN',
  video: false,
  vote_average: 7.6,
  vote_count: 1264,
});

listButton.addEventListener('click', onClick);
function onClick(evt) {
  if (evt.target.classList.contains('js-watched')) {
    console.log('storage.getTwentyFromWatch():', storage.getTwentyFromWatch());
    renderFilms(storage.getTwentyFromWatch(), filmBoxRef);
  }
  if (evt.target.classList.contains('js-queue')) {
    renderFilms(storage.getTwentyFromQueue(), filmBoxRef);
  }
}
