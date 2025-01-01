import tracemalloc
import asyncio
from twikit import Client
import time
from datetime import datetime
import csv
from configparser import ConfigParser
from random import randint
import nest_asyncio

nest_asyncio.apply()
tracemalloc.start()

class TweetScraper:
    def __init__(self, config_file='/home/hemant/TruthTell/TruthLens/config.ini', cookies_file='/home/hemant/TruthTell/TruthLens/cookies.json', output_file='tweets.csv', query=None, min_tweets=10):
        self.config_file = config_file
        self.cookies_file = cookies_file
        self.output_file = output_file
        self.query = query
        self.min_tweets = min_tweets
        self.client = Client(language='en-US')
        self.tweet_count = 0
        
        # Load configuration settings
        self.config = ConfigParser()
        self.config.read(config_file)
        self.username = self.config['X']['username']
        self.email = self.config['X']['email']
        self.password = self.config['X']['password']
        
    def create_csv(self):
        """Create and initialize the CSV file with headers."""
        with open(self.output_file, mode='w', newline='', encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerow(['S.No', 'User', 'Tweet', 'Date', 'Retweets', 'Likes'])
    
    async def login(self):
        self.client.load_cookies(self.cookies_file)

    async def fetch_tweets(self):
        """Fetch tweets based on the query until the minimum tweet count is reached."""
        tweets = None
        while self.tweet_count < self.min_tweets:
            if tweets is None:
                # print(f'{datetime.now()} - Getting tweets...')
                tweets = await self.client.search_tweet(self.query, product='Latest')
            else:
                wait_time = randint(5, 10)
                # print(f'{datetime.now()} - Getting next tweets after {wait_time} seconds...')
                time.sleep(wait_time)
                tweets = await tweets.next()
            
            for tweet in tweets:
                self.tweet_count += 1
                tweet_data = [self.tweet_count, tweet.user.name, tweet.text, tweet.created_at, tweet.retweet_count, tweet.favorite_count]
                with open(self.output_file, mode='a', newline='', encoding="utf-8") as file:
                    writer = csv.writer(file)
                    writer.writerow(tweet_data)
        
        # print(f"Total tweets fetched: {self.tweet_count}")
    
    async def start_scraping(self):
        """Initialize the scraping process."""
        await self.login()
        self.create_csv()
        await self.fetch_tweets()

if __name__ == "__main__":
    query = 'ISRO Satellite'  # Assign your query string here
    scraper = TweetScraper(query=query)
    asyncio.run(scraper.start_scraping())  # Run the asyncio event loop for scraping