**CMSI 3520** Database Systems, Fall 2021

# Cinquel Document Database Assignment Loading Instructions

## Python Loader

_Installation instuctions assume that you already have [MongoDB](https://www.mongodb.com/try/download/community) installed on your machine._

1. Visit the [TMDB Dataset on Kaggle](https://www.kaggle.com/tmdb/tmdb-movie-metadata) and download the dataset.
2. Place files in the python folder
3. Import necessary python packages. For this project, we used pyMongo to interact with our database.
4. Run the main_loader.py from the python folder to create and populate the tmdb database.
5. Run queries!

## Second Method (Do not use)

_Will not work with some queries. Outdated method of populating our database. Kept for posterities sake! Installation instuctions assume that you already have [MongoDB](https://www.mongodb.com/try/download/community) and [Mongo Toolset](https://docs.mongodb.com/database-tools/installation/installation/) installed on your machine._

1. Visit the [TMDB Dataset on Kaggle](https://www.kaggle.com/tmdb/tmdb-movie-metadata) and download the dataset.
2. Edit run.bat file

   - Replace the file paths for the dataset files that currently read:\
     C:\Users\Jason\Documents\Databases\document-db-mini-stack-cinquel\tmdb_5000_movies.csv and
     C:\Users\Jason\Documents\Databases\document-db-mini-stack-cinquel\tmdb_5000_credits.csv\

     With your current TMDB Dataset file paths.

3. Save and run the batch file to create and fill your brand new TMDB Database
4. Run queries!
