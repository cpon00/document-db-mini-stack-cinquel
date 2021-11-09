import { updateRuntime } from "./netflix-dal.mjs";

//to search for an average rating, input the movie id
if (process.argv.length !== 4) {
  console.log("Usage: update-runtiume <id, newTime>");
  process.exit(1);
}
const query = process.argv[2];
const newTime = process.argv[3];

await updateRuntime(query, newTime);
console.log(
  `Updated document with ID: ${query} to have a new runtime of: ${newTime}.`
);
process.exit(0);
