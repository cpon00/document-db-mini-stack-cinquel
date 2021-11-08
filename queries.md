# Queries

> A query that selects a subset of a particular entity in your dataset

```json
db.movies.find({overview: /pirate/i}, { _id: 0, id: 1, title: 1, year: 1}).sort({title: 1})
```

Queries the id and title of all movies with "pirate" (case insensitive) in the overview, sorted by the title

<center><img src="./assets/qt1.png" style="width: 90%" ></img></center>

> Another such query, with a specific sort order

```json
db.movies.find( {original_language: /zh/i}, { _id: 0, id: 1, title: 1, year: 1}).sort({title: 1})
```

<center><img src="./assets/qt2.png" style="width: 90%" ></img></center>

> Either a sequence of queries that combines information from more than one collection (this may require some pseudocode that connects one collection to another) or a query that iterates through nested collections or sub-objects

```json
db.movies.find( {title: /spongebob/i}, { _id: 0, id: 1, title: 1, year: 1}).sort({title: 1})
```

<center><img src="./assets/qt3.png" style="width: 90%" ></img></center>

> An aggregate query that provides counts or other aggregate computations for certain groups in your dataset

```json
db.movies.find( {title: /spongebob/i}, { _id: 0, id: 1, title: 1, year: 1}).sort({title: 1})
```

<center><img src="./assets/qt4.png" style="width: 90%" ></img></center>

> A ranking query that provides the “top” or “bottom” n documents based on some metric

```json
db.movies.find( {title: /spongebob/i}, { _id: 0, id: 1, title: 1, year: 1}).sort({title: 1})
```

<center><img src="./assets/qt5.png" style="width: 90%" ></img></center>

> 6

```json
db.movies.find( {title: /spongebob/i}, { _id: 0, id: 1, title: 1, year: 1}).sort({title: 1})
```

<center><img src="./assets/qt6.png" style="width: 90%" ></img></center>

> 7

```json
db.movies.find( {title: /spongebob/i}, { _id: 0, id: 1, title: 1, year: 1}).sort({title: 1})
```

<center><img src="./assets/qt7.png" style="width: 90%" ></img></center>
