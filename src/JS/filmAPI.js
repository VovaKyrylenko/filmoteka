import axios from 'axios';

let page = 1
const API_KEY = "1aec7afb2309fd39902ffda599461df1";

async function fetchPopularMovies(){
    const resp = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`)
    if (resp.data.results.length <= 0) {
        return null;
    }
    return resp.data.results;
 }

 async function fetchKeyword(keyword){
    const resp = await axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${keyword}&page=${page}`)
    if (resp.data.results.length <= 0) {
        return null;
    }
    return [resp.data.results, resp.data.total_pages];
}


async function fetchById(id){
    const resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    return resp.data;
 }

