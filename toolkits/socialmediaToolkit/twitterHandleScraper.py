import requests
import csv
from dotenv import load_dotenv, find_dotenv
import os 
dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

TWITTER_HANDLE_API = os.getenv("TWITTER_HANDLE_API")
ACTOR_URL = 'https://api.apify.com/v2/acts/gentle_cloud~twitter-tweets-scraper/run-sync-get-dataset-items'
TWITTER_HANDLE = 'aajtak'  # AajTak's Twitter handle

def scrape_twitter(handle, api_token):
    """
    Scrapes the latest tweets from the specified Twitter handle using Apify API.
    
    Args:
        handle (str): Twitter handle to scrape.
        api_token (str): API token for authentication.

    Returns:
        list: List of tweets (JSON objects) if successful, otherwise an empty list.
    """
    params = {
        "token": api_token,
        "username": handle,  # Target Twitter handle
        "mode": "latest",    # Fetch latest tweets
        "maxItems": 100      # Maximum number of tweets to fetch
    }
    
    print("Sending request to scrape Twitter...")
    response = requests.get(ACTOR_URL, params=params)
    print(f"Response status code: {response.status_code}")
    if response.status_code == 200:  # Success
        print("Request successful. Fetching tweets...")
        return response.json()  # JSON response contains tweet data
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
        print(f"Error message: {response.text}")
        return []

def save_to_csv(tweets, filename="aajtak_tweets.csv"):
    """
    Saves tweet data to a CSV file.

    Args:
        tweets (list): List of tweet objects.
        filename (str): Filename for the CSV file.
    """
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

if __name__ == "__main__":
    # Scrape tweets
    tweets = scrape_twitter(TWITTER_HANDLE, API_TOKEN)
    if tweets:
        # Save tweets to CSV
        save_to_csv(tweets)
