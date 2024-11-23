import requests
import csv
import time

url = "https://api.apify.com/v2/acts/apidojo~tweet-scraper/run-sync-get-dataset-items?token=apify_api_we3sKd4NhbQ40a6GWtBu9rccGhEvJZ0S8IVD"

def fetch_tweets(api_url):
    try:
        print("Fetching data from the API...")
        
        response = requests.get(api_url)
        response.raise_for_status()  
        
        data = response.json()
        if isinstance(data, list) and len(data) > 0: 
            print(f"Successfully fetched {len(data)} tweets.")
            return data
        else:
            print("No data found or data format is unexpected.")
            return []
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return []

def save_to_csv(tweets, filename="tweets.csv"):
    try:
        print(f"Saving {len(tweets)} tweets to {filename}...")
        
        with open(filename, mode="w", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerow(["User", "Tweet", "Date"]) 
            for tweet in tweets:
                writer.writerow([
                    tweet.get("user", {}).get("username"),  
                    tweet.get("text"),                    
                    tweet.get("createdAt")              
                ])
        print(f"Tweets saved successfully to {filename}.")
    except Exception as e:
        print(f"Error saving data: {e}")

if __name__ == "__main__":
    tweets_data = fetch_tweets(url)
    if tweets_data:
        save_to_csv(tweets_data)
