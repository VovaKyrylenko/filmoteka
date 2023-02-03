const axios = require('axios').default;

const movieListEl = document.querySelector('.films-list'); 
const key = '60b5bf446116d1216ef8df748d38dc14';
const genreInfo = '{"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}';

// функція отримання інформації про популярні фільми і малювання їх на сторінці
fetchPopularFilmList();
async function fetchPopularFilmList(pages = 1) {
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${pages}`;

        const response = await axios.get(url);
        console.log(response.data.results);

        printMovies(response.data.results, movieListEl);
    } catch (error) {
        console.log(error);
    }
}

// // функція отримання інформації про жанри
// async function getGenresInfo() {
//     try {
//         const urlGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`;
//         const responseGenre = await axios.get(urlGenre);
//         console.log(responseGenre.data.genres);
//         return await responseGenre.data.genres;
//     } 
//     catch (error) {
//         console.log(error);
//     }
// }

// функція малювання карток на сторінці
async function printMovies(movies, movieListEl) {
    try {
        const genresInfo = JSON.parse(genreInfo);

    movieListEl.innerHTML = movies.map((movie) => {
        // створення списку жанрів
        const genresList = [];
        movie.genre_ids.length
        ? movie.genre_ids.forEach(el => {
            elem = genresInfo.genres.find(opt => opt.id === el).name;
            genresList.push(elem);
        })
        : genresList.push('Another genre');
        genres = genresList.join(', ');

        // створення url постерів
        const imgUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://image.tmdb.org/t/p/w500<<undefined img>>'

        // виділення року із дати
        const date = movie.release_date 
        ? new Date(movie.release_date).getFullYear()
        : "-";

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
    } catch (error) {
        console.log(error);
    }
}

