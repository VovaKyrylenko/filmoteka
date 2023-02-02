import axios from 'axios';

const API_KEY = "1aec7afb2309fd39902ffda599461df1";

async function fetchPopularMovies(){
    const resp = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
    return (resp.data.results);
 }

 async function fetchKeyword(){
    let keyword = document.querySelector('input[type=text]').value;

    const resp = await axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${keyword}`)
    return (resp.data.results);
}