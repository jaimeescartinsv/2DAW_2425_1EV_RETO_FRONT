import { fetchMovies, displayMovies } from './showtimes.js';
import { initSeatSelection } from './seatSelection.js';

document.addEventListener('DOMContentLoaded', () => {
    fetchMovies().then(movies => displayMovies(movies));
});