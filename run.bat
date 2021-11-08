@ECHO OFF
mongoimport --db tmdb --collection movie --drop --type csv --headerline --ignoreBlanks --file C:\Users\Jason\Documents\Databases\document-db-mini-stack-cinquel\tmdb_5000_movies.csv && mongoimport --db tmdb --collection credit --drop --type csv --headerline --ignoreBlanks --file C:\Users\Jason\Documents\Databases\document-db-mini-stack-cinquel\tmdb_5000_credits.csv
PAUSE