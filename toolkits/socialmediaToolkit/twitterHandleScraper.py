import requests
import csv
from dotenv import load_dotenv, find_dotenv
import os

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)


class TwitterHandleScraper:
    def __init__(self, handle, api_token):
        self.handle = handle
        self.api_token = api_token
        self.actor_url = 'https://api.apify.com/v2/acts/gentle_cloud~twitter-tweets-scraper/run-sync-get-dataset-items'

    def scrape(self):
        """Scrapes the latest tweets from the specified Twitter handle using Apify API."""
        params = {
            "token": self.api_token,
            "username": self.handle,
            "mode": "latest",
            "maxItems": 1
        }

        print("Sending request to scrape Twitter...")
        response = requests.get(self.actor_url, params=params)
        print(f"Response status code: {response.status_code}")
        if response.status_code == 200:
            print("Request successful. Fetching tweets...")
            return response.json()
        else:
            print(f"Failed to fetch data. Status code: {response.status_code}")
            print(f"Error message: {response.text}")
            return []


class TweetSaver:
    @staticmethod
    def save(tweets, filename="aajtak_tweets.csv"):
        """Saves tweet data to a CSV file."""
        print(f"Saving {len(tweets)} tweets to {filename}...")
        try:
            with open(filename, mode="w", newline="", encoding="utf-8") as file:
                writer = csv.writer(file)
                # Header for CSV
                writer.writerow(["Created At", "Tweet Text", "Language", "URL", "View Count", "Retweet Count"])
                # Write tweet data to CSV
                for tweet in tweets:
                    writer.writerow([
                        tweet.get("created_at"),
                        tweet.get("full_text"),
                        tweet.get("lang"),
                        tweet.get("url"),
                        tweet.get("views_count"),
                        tweet.get("retweet_count")
                    ])
            print(f"Data successfully saved to {filename}.")
        except Exception as e:
            print(f"Error saving data to CSV: {e}")


# if __name__ == "__main__":
#     twitter_scraper = TwitterHandleScraper(handle=os.getenv("TWITTER_HANDLE"), api_token=os.getenv("TWITTER_HANDLE_API"))
#     tweets = twitter_scraper.scrape()
#     if tweets:
#         TweetSaver.save(tweets)