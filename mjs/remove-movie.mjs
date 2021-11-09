import { removeMovie } from "./netflix-dal.mjs";

//to search for an average rating, input the movie id
if (process.argv.length !== 3) {
  console.log("Usage: remove-movie <id>");
  process.exit(1);
}

const query = process.argv[2];
await removeMovie(query);
console.log(`Deleted document with ID: ${query}.`);
process.exit(0);
