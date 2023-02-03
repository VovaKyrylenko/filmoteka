import axios from 'axios';
const API_KEY = '1aec7afb2309fd39902ffda599461df1';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class filmAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.lastPage = 1;
  }
  //  запрос популярных фильмов
  async fetchPopularMovies() {
    const resp = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`
    );
    return resp.data.results;
  }
  // запрос фильмов по ключевому слову
  async fetchKeyword(keyword) {
    const resp = await axios.get(
      `${BASE_URL}/search/keyword?api_key=${API_KEY}&query=${keyword}&page=${this.page}`
    );
    return [resp.data.results, resp.data.total_pages];
  }
  // запрос фильма по ID
  async fetchById(id) {
    const resp = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    return resp.data;
  }
  // увеличивает страницу на один. для пагинации (стрелочками). вызывать перед запросом
  incrementPage() {
    if (this.page === this.lastPage) {
      return;
    }
    this.page += 1;
  }
  // уменьшает страницу на один. для пагинации (стрелочками). вызывать перед запросом
  decrementPage() {
    if (this.page === 1) {
      return;
    }
    this.page -= 1;
  }
  // устанавливает значение страницы для пагинации . принимает число(указанное в нумерации) и присваевает странице. вызывать перед запросом
  setPage(value) {
    this.page = value;
  }
  // сбрасивает значение страницы на 1. вызывать перед поиском по новому ключевому слову, после проверки значения с инпута
  resetPage() {
    this.page = 1;
  }
  //  устанавливает значение последней страницы для пагинации и проверок. вызывать после успешного ответа бекенда. принимает тотал пейдж
  setLastPage(value) {
    this.lastPage = value;
  }
  // устанавливает значение поискового слова . нужен для проверок при поиске по новому слову
  setSearchQuery(value) {
    this.searchQuery = value;
  }
}

// let page = 1;
// const API_KEY = '1aec7afb2309fd39902ffda599461df1';

// async function fetchPopularMovies() {
//   const resp = await axios.get(
//     `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
//   );
//   if (resp.data.results.length <= 0) {
//     return null;
//   }
//   return resp.data.results;
// }

// async function fetchKeyword(keyword) {
//   const resp = await axios.get(
//     `https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${keyword}&page=${page}`
//   );
//   if (resp.data.results.length <= 0) {
//     return null;
//   }
//   return [resp.data.results, resp.data.total_pages];
// }

// async function fetchById(id) {
//   const resp = await axios.get(
//     `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
//   );
//   return resp.data;
// }
