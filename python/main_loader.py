from pymongo import MongoClient
from datetime import datetime
import csv
import json

# For simplicity, we assume that the program runs where the files are located.
MOVIE_SOURCE = 'tmdb_5000_movies.csv'
CREDIT_SOURCE = 'tmdb_5000_credits.csv'

# MongoClient connections. By default, connects to localhost at port 27017, with db set to 'tmdb'.
client = MongoClient('localhost', 27017)
db = client['tmdb']

# We have two files to load, but only some of the files in the credits are relevant.
# So we open both and use only the cast and crew portion of credits.
with open(MOVIE_SOURCE, 'r+', encoding='UTF-8') as m, open(CREDIT_SOURCE, 'r+', encoding='UTF-8') as c:
    movie_list, credit_list = list(csv.DictReader(m)), list(csv.DictReader(c))
    for movie, credit in zip(movie_list, credit_list):
        result = {}
        result['id'] = int(movie['id'])
        result['title'] = movie['title']
        # There were singular movies in our dataset that had bad values. As such, rather than simply removing them, we gave them an arbitrary date.
        if movie['release_date'] == '':
            movie['release_date'] = datetime.strptime('3000-1-1', '%Y-%m-%d')
        else:
            result['release_date'] = datetime.strptime(
                movie['release_date'], '%Y-%m-%d')
        result['original_language'] = movie['original_language']
        result['budget'] = int(movie['budget'])
        result['genre'] = json.loads(movie['genres'])
        result['keywords'] = json.loads(movie['keywords'])
        result['overview'] = movie['overview']
        result['popularity'] = float(movie['popularity'])
        result['vote_average'] = float(movie['vote_average'])
        # Likewise as above.
        if movie['runtime'] == '':
            result['runtime'] = 0
        else:
            result['runtime'] = int(float(movie['runtime']))
        result['cast'] = json.loads(credit['cast'])
        result['crew'] = json.loads(credit['crew'])
        # Instead of creating a results object, I could have built an object within the insert_one(), but I felt this was clearer and more concise. Pardon my space usage.
        x = db.movie.insert_one(result)
        # Print statement for ID of inserted entry.
        print(x.inserted_id)
