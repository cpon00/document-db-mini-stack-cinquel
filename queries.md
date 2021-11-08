# Queries

> A query that selects a subset of a particular entity in your dataset

```json
db.movie.find({overview: /pirate/i}, {title: 1, _id: 0, id: 1,  release_date: 1})
```

Queries the id, release date, and title of all movies with "pirate" (case insensitive) in the overview

<center><img src="./assets/qt1.png" style="width: 90%" ></img></center>

> Another such query, with a specific sort order

```json

db.movie.find({runtime: {$gte: 200}}, { _id: 0, id: 1, title: 1, release_date: 1, runtime :1}).sort({runtime: -1, title: 1})

```

Queries the id, release date, runtime, and title of movies with a runtime of greater than or equal to 200 minutes and sorted by descending runtime.

<center><img src="./assets/qt2.png" style="width: 90%" ></img></center>

> Either a sequence of queries that combines information from more than one collection (this may require some pseudocode that connects one collection to another) or a query that iterates through nested collections or sub-objects

```json
db.movie.aggregate([
    {$unwind : "$genre"},
    {$match  : { $or: [ {'genre.name':/Adventure/i}, {'genre.name':/Action/i} ] } },
    {$group  : {_id: {title: '$title'} }},
    {$sort   : {'_id.title': 1}},
])
```

Queries the title of movies that are categorized as an Action or Adventure movie in the genres nested collection.

<center><img src="./assets/qt3.png" style="width: 90%" ></img></center>

> An aggregate query that provides counts or other aggregate computations for certain groups in your dataset

```json
db.movie.aggregate([
  {$match : {original_language: /en/}},
  {$group : {_id:"$release_date", count:{$sum:1}}},
  {$sort  : {count: -1}},
  {$limit : 10}
])
```

Queries movies in english released on the same day, sorted by descending count, limited to the top ten.

<center><img src="./assets/qt4.png" style="width: 90%" ></img></center>

> A ranking query that provides the “top” or “bottom” n documents based on some metric.

```json
db.movie.find({popularity: {$gte: 200}}, {title: 1, _id: 0, popularity: 1}).sort({popularity: -1}).limit(10)
```

Queries title and popularity of movies with a popularity rating of 200 or greater, sorted by descending popularity and limited to the top 10 results.

<center><img src="./assets/qt5.png" style="width: 90%" ></img></center>

> I really like Home Alone

```json
db.movie.find( {title: /home/i , overview: /christmas/i}, { _id: 0, id: 1, title: 1, release_date: 1}).sort({title: 1})
```

Queries the id, title, and release date from movies with 'home' in the title that have 'christmas' in the overview sorted by title

<center><img src="./assets/qt6.png" style="width: 90%" ></img></center>

> Language Aggregate Query

```json
db.movie.aggregate([
  {$match : { $or: [ { original_language: /fr/ }, { original_language : /en/ }, { original_language : /zh/ }, { original_language : /es/ },{ original_language : /fa/ },{ original_language : /de/ }]}},
  {$group : {_id:"$original_language", count:{$sum:1}}},
  {$sort : {count: -1}}
])
```

Aggregate count of the number of movies released originally in English, French, Spanish, Chinese, German, and Farsi in our dataset, sorted by count in descending order

<center><img src="./assets/qt7.png" style="width: 90%" ></img></center>

> All movies James Cameron Directed just for fun

```json
db.movie.aggregate([
    {$unwind : "$crew"},
    {$match  : { $and: [ {'crew.name':/james cameron/i}, {'crew.job':/director/i} ] } },
    {$group  : {_id: {title: '$title'} }},
    {$sort   : {'_id.title': 1}},
])
```

<center><img src="./assets/qt7.png" style="width: 90%" ></img></center>
