function movieSelector(movies, filterFn, mapFn) {
  return movies.filter(filterFn).map(mapFn);
}

const mapFn = (movie) => movie.title.toUpperCase();
const filterFn = (movie) => movie.score > 5;

const movies = [
  { id: 1, title: "Pan's Labyrinth", score: 9 },
  { id: 37, title: "Gentelman", score: 6 },
  { id: 11, title: "Batman", score: 5 },
  { id: 44, title: "Birds of Pray", score: 1 },
];

console.log(movieSelector(movies, filterFn, mapFn));
