# Netflix Practice

## Queries

### Movies filtered by title and/or year:

> A query that retrieves the ID, year, and title of movies that fit criteria of your choosing (e.g., movies with certain titles or title patterns, movies released on one or more given years, etc.), sorted ascending by title.

```json
db.movies.find( {title: /spongebob/i}, { _id: 0, id: 1, title: 1, year: 1}).sort({title: 1})
```

Queries the title, release year, and id of the movies with "Spongebob" in the title.

<center><img src="./assets/q1.png" style="width: 90%" ></img></center>

### Number of movies released per year:

> A query that takes movie criteria of your choosing and returns a collection consisting of year and count where count is the number of movies that meet these criteria which were released on that year, sorted ascending by year.

```json
db.movies.aggregate([
  {"$match" : {title: /spongebob/i}},
  {"$group" : {_id:"$year", count:{$sum:1}}},
  {"$sort":{year: 1}}
])
```

Aggregate of all the movies with spongebob in the title and sorted by year

<center><img src="./assets/q2.png" style="width: 90%" ></img></center>

### Years with the most movies released:

> A query that takes movie criteria of your choosing and returns the same collection as above except it only returns the year and count of the top five (5) years with the most movies released, sorted descending by count then ascending by year in case of a tie.

```json
db.movies.aggregate([
  {"$match" : {title: /dog/i}},
  {"$group" : {_id:"$year", count:{$sum:1}}},
  {"$sort": {count: -1, _id: 1}},
  {"$limit": 5}
])
```

Aggregate of all the movies with dog in the title and sorted by count (desc), but limited to the top 5 years with the most movies released. In the case of a tie count, sort ascending by year.

<center><img src="./assets/q3.png" style="width: 90%" ></img></center>

### Movies rated a certain way by a specific user:

> A query that lists the title and year of movies seen by a particular user with a rating matching conditions of your choosing (e.g., 4 and above, 2 and below, etc.) sorted ascending by title.

```json
db.movies.aggregate([
  { $unwind: "$ratings" },
  { $match: { $and:[ { 'ratings.viewer_id': 2442 }, { 'ratings.rating': 5 } ] } },
  { $group: {_id: {title: '$title', year: '$year'} }},
  { $sort:  {'_id.title': 1}},
])
```

Queries all reviews made by user '2442' with a rating of '5', sorted ascending by title. Display title and year.

<center><img src="./assets/q4.png" style="width: 90%" ></img></center>

### Average rating of movies:

> A query that takes movie criteria of your choosing and returns a collection consisting of title, year, and avg where avg is the average rating received by each movie, sorted descending by avg (thus listing the top-rated movie first) then ascending by title in the case of a tie.

```json
db.movies.aggregate([
  { $unwind: "$ratings"},
  {"$match" : {title: /spongebob/i}},
  {"$group" : {_id:{title: "$title", year: "$year"}, avg_rating: {$avg:"$ratings.rating"}}},
  {"$sort" :  {avg_rating: -1, title: 1}}
])
```

Selects title, year, and average rating of all movies with spongebob in the title descending by the average rating and ascending by title in the case of a tie.

<center><img src="./assets/q5.png" style="width: 90%" ></img></center>

### Specific average rating of movies:

> A query that takes movie criteria of your choosing and returns a collection consisting of title, year, and avg where avg is the average rating received by each movie and meeting some condition of your choosing such as average greater than 4, average less than 3, etc.—the results should be sorted descending by avg (thus listing the top-rated movie first) then ascending by title in case of a tie.

```json

db.movies.aggregate([
{ $unwind: "$ratings"},
{ $match : {$and: [{year: {$gte: 1999}}, {title: /spongebob/i }]}},
{ $group : {_id: { title: "$title", year: "$year"}, avg_rating: {$avg: "$ratings.rating"} } },
{ $match : {avg_rating:{ $gte:4}}},
{ $sort  : {avg_rating: -1, title: 1}}
])

```

Queries movies, year, and average rating with a title that includes a case insensitive "spongebob" and was released in or after 1999 and displays results with an average rating of over or equal to 4.0.

<center><img src="./assets/q6.png" style="width: 90%" ></img></center>

### Number of reviews received by a movie during a certain time period:

> A query that takes movie criteria of your choosing and returns a collection consisting of title, year, and count where count is the number of reviews received by each movie within a particular date range of your choosing such as after 2005, during the month of September, etc.—the results should be sorted descending by count (thus listing the most-frequently-rated movie first) then ascending by title in case of a tie.

```json
db.movies.aggregate([
  { $unwind: "$ratings"},
  { $match: {$and:[{title: /spongebob/i}, {'ratings.date_rated': {$gte: '2005-1-1'}}]}},
  { $group: {_id:{title: "$title", year: "$year"}, review_count: {$sum: 1}}},
  { $sort: { review_count: -1, title: 1 }}
])
```

Queries all movies with the title 'spongebob', and having ratings after January 1st, 2005; sorts descending by count, then ascending by year.

<center><img src="./assets/q7.png" style="width: 90%" ></img></center>
