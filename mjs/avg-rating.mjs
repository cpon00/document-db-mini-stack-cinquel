import { getAvgRatingOfMovie } from "./netflix-dal.mjs";

//to search for an average rating, input the movie id
if (process.argv.length !== 3) {
  console.log("Usage: get-avg-rating <query>");
  process.exit(1);
}

const query = process.argv[2];

const result = await getAvgRatingOfMovie(query);
if (result.length === 0) {
  console.log(`No movies match ${query}.`);
}

result.forEach((movie) => {
  console.log(`${movie.title}(id: ${query}) is rated: ${movie.vote_average}!`);
});

process.exit(0);
