import { searchMoviesByTitle } from "./netflix-dal.mjs";

if (process.argv.length !== 3) {
  console.log("Usage: search-by-title <query>");
  process.exit(1);
}

const query = process.argv[2];

const result = await searchMoviesByTitle(query);
if (result.length === 0) {
  console.log(`No movies match “${query}”.`);
}

result.forEach((movie) => {
  console.log(
    `ID: ${movie.id} Title: “${movie.title}” Runtime: ${movie.runtime}`
  );
});

process.exit(0);
