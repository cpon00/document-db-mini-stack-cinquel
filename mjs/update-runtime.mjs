import { updateRuntime, searchMovieByID } from "./netflix-dal.mjs";

if (process.argv.length !== 4) {
  console.log("Usage: update-runtiume <id, newTime>");
  process.exit(1);
}
const query = process.argv[2];
const newTime = process.argv[3];
const result = await searchMovieByID(query);
await updateRuntime(query, newTime);
//checks if movie exists

if (result.length === 0) {
  console.log(`ID: ${query} does not exist`);
  //checks if newTime is correct type
} else if (isNaN(+newTime)) {
  console.log(`Need to input an int. You inputted a string.`);
} else {
  console.log(
    `Updated document with ID: ${query} to have a new runtime of: ${newTime}.`
  );
}

process.exit(0);
