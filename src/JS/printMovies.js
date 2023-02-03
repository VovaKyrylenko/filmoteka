const axios = require('axios').default;

const movieListEl = document.querySelector('.films-list'); 
const key = '60b5bf446116d1216ef8df748d38dc14';

// функція отримання інформації про популярні фільми і малювання їх на сторінці
fetchPopularFilmList();
async function fetchPopularFilmList(pages = 1) {
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${pages}`;

        const response = await axios.get(url);
        console.log(response.data.results);

        printMovies(response.data.results, movieListEl);
    } catch (error) {
        console.dir(error);
    }
}

// функція отримання інформації про жанри
async function getGenresInfo() {
    const urlGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`;

    const responseGenre = await axios.get(urlGenre);
    return await responseGenre.data.genres;
}

// функція малювання карток на сторінці
async function printMovies(movies, movieListEl) {
    const genresInfo = await getGenresInfo();

    movieListEl.innerHTML = movies.map((movie) => {
        // створення списку жанрів
        const genresList = [];
        movie.genre_ids.forEach(el => {
            elem = genresInfo.find(opt => opt.id === el).name;
            genresList.push(elem);
        });
        genres = genresList.join(', ');

        // створення url постерів
        const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        // виділення року із дати
        const date1 = new Date(movie.release_date);
        let date = date1.getFullYear();

        // розмітка картки
        return `
                <li class="movie_card">
                    <img class="movie_card_img" src="${imgUrl}" alt="film" />

                    <p class="movie_card_title">${movie.original_title}</p>
                    <div class="movie_card_desc">
                        <p class="movie_card_ganres">${genres}</p>
                        <p class="movie_card_year">${date} year</p>
                        <span class="movie_card_rating">${movie.vote_average}</span>
                        </div>
                </li>`})
        .join('');
}

