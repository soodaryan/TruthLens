import requests
import csv

API_TOKEN = 'apify_api_we3sKd4NhbQ40a6GWtBu9rccGhEvJZ0S8IVD'
ACTOR_URL = 'https://api.apify.com/v2/acts/gentle_cloud~twitter-tweets-scraper/run-sync-get-dataset-items'
TWITTER_HANDLE = 'aajtak'  

def scrape_twitter(handle, api_token):
    params = {
        "token": api_token,
        "username": handle, 
        "mode": "latest",  
        "maxItems": 100      
    }
    
    print("Sending request to scrape Twitter...")
    response = requests.get(ACTOR_URL, params=params)
    print(f"Response status code: {response.status_code}")
    if response.status_code == 201:
        print("Request successful.")
        return response.json()  
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
        print(f"Error message: {response.text}")
        return []

def save_to_csv(tweets, filename="aajtak_tweets.csv"):
    print(f"Saving {len(tweets)} tweets to {filename}...")
    try:
        with open(filename, mode="w", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerow(["created_at", "full_text", "lang", "url", "views_count", "retweet_count"])
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
    tweets = scrape_twitter(TWITTER_HANDLE, API_TOKEN)
    if tweets:
        save_to_csv(tweets)
