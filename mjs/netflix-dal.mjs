import mongodb from "mongodb";
const { MongoClient } = mongodb;

// The MongoDB documentation calls this object `client` but the name `db` is used here
// to provide an analogy across various DAL examples.

//Local host port is specific to my machine. Change your DB port to make DAL run.
const db = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});

const DB_NAME = "tmdb";
const MOVIE_COLLECTION = "movie";

// Helper function for accessing the `movies` collection from an already-connected database.
const moviesCollection = () => db.db(DB_NAME).collection(MOVIE_COLLECTION);

// Helper function for “unrolling” a cursor into an in-memory array.
const arrayFromCursor = async (cursor) => {
  // cursor.forEach is asynchronous!
  const result = [];
  await cursor.forEach((item) => result.push(item));
  return result;
};

const searchMoviesByTitle = async (query, limit = 100) => {
  try {
    await db.connect();
    const movies = moviesCollection();

    // MongoDB doesn’t return entire collections but instead returns a _cursor_ that allows
    // iteration through a collection. However, our DALs are designed to return full data
    // structures of returned results, so we need to “dump” the cursor’s contents into an
    // object before returning them.
    const cursor = await movies
      .find(
        {
          title: { $regex: query, $options: "i" },
        },
        {
          projection: {
            ratings: 0,
          },
        }
      )
      .sort({
        title: 1,
      })
      .limit(limit);

    return await arrayFromCursor(cursor);
  } finally {
    await db.close();
  }
};

const getAvgRatingOfMovie = async (query) => {
  try {
    await db.connect();
    const movies = moviesCollection();

    const cursor = await movies.aggregate([
      {
        $match: {
          id: +query,
        },
      },
      {
        $project: {
          title: 1,
          vote_average: 1,
          _id: 0,
        },
      },
      { $sort: { vote_average: -1 } },
    ]);

    return await arrayFromCursor(cursor);
  } finally {
    await db.close();
  }
};

const insertMovie = async (title, year) => {
  try {
    await db.connect();
    const movies = moviesCollection();

    // `insertOne` returns the newly-created document, along with its new ID.
    return await movies.insertOne({
      title,
      date: +date, // Convert to a number.
      ratings: [], // Initialize just for consistency.
      genre: {},
      keywords: {},
      cast: {},
      crew: {},
    });
  } finally {
    await db.close();
  }
};

const removeMovie = async (query) => {
  try {
    await db.connect();
    const movies = moviesCollection();

    await movies.deleteOne({
      id: +query,
    });
  } finally {
    await db.close();
  }
};

const updateRuntime = async (query, newTime) => {
  try {
    await db.connect();
    const movies = moviesCollection();

    await movies.updateOne(
      { id: +query },
      { $set: { runtime: +newTime } },
      { upsert: true }
    );
  } finally {
    await db.close();
  }
};

export {
  searchMoviesByTitle,
  getAvgRatingOfMovie,
  insertMovie,
  removeMovie,
  updateRuntime,
};
