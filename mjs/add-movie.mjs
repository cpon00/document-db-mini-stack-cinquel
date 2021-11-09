import { insertMovie } from "./netflix-dal.mjs";

if (process.argv.length !== 3) {
  console.log(
    "Usage: add-movie <id> <title> <release_date> <original_language> <budget> <overview> <popularity> <vote_average> <runtime> "
  );
  process.exit(1);
}
// genre, keywords, cast, crew are nested json objects in the databse. When adding to the database, these fields will be initilized to an empty array and the user
// can modify those objects after they have been inserted
const id = process.argv[2];
// const title = process.argv[3];
// const release_date = process.argv[4];
// const original_language = process.argv[5];
// const budget = process.argv[6];
// const genre = [];
// const keywords = [];
// const overview = process.argv[7];
// const popularity = process.argv[8];
// const vote_average = process.argv[9];
// const runtime = process.argv[10];
// const cast = [];
// const crew = [];
try {
  // In MongoDB, the returned value contains additional metadata.
  const insertResult = await insertMovie(
    id
    // title,
    // release_date,
    // original_language,
    // budget,
    // genre,
    // keywords,
    // overview,
    // popularity,
    // vote_average,
    // runtime,
    // cast,
    // crew
  );

  const { insertedId, ops } = insertResult;
  const movie = ops[0] || {};
  console.log(
    `Movie “${movie.title}” (${movie.release_date}) added with ID ${insertedId}.`
  );
} catch (error) {
  console.error(
    // `Sorry, something went wrong. Please ensure that "${release_date}" is a valid date.`
    "error"
  );
}

// Explicitly exit sync since we are asynchronous at this point.
process.exit(0);
