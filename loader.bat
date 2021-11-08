:: OUTDATED - We used to use mongoimport to directly load two collections with movies and credits, but we decided to combine them into one collection instead. 

ECHO OFF
mongoimport --db tmdb --collection movie --drop --type csv --headerline --ignoreBlanks --file C:\Users\Jason\Documents\Databases\document-db-mini-stack-cinquel\tmdb_5000_movies.csv && mongoimport --db tmdb --collection credit --drop --type csv --headerline --ignoreBlanks --file C:\Users\Jason\Documents\Databases\document-db-mini-stack-cinquel\tmdb_5000_credits.csv
PAUSE