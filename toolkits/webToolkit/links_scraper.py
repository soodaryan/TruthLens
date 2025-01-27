from serpapi import GoogleSearch
from dotenv import load_dotenv, find_dotenv
import os 
import json
import urllib.request

class NewsLinkExtractor:
    def __init__(self):
        """Initializes the NewsLinkExtractor with environment variables and API setup."""
        dotenv_path = find_dotenv()
        load_dotenv(dotenv_path)
        self.params = {
            "engine": "google_news",
            "gl": "us",
            "hl": "en",
            "api_key": os.getenv("SERP_API_KEY")
        }

    def extract_links(self, query):
        """Extracts news links based on the query provided using SerpAPI."""
        self.params["q"] = query
        search = GoogleSearch(self.params)
        results = search.get_dict()
        news_results = results.get("news_results", [])
        return [news_result["link"] for news_result in news_results]

    def fallback_extract_links(self, query):
        """Fallback to GNews API for extracting links."""
        apikey = os.getenv("gnews_api_key")
        url = f"https://gnews.io/api/v4/search?q={query}&lang=en&country=us&max=10&apikey={apikey}"
        try:
            with urllib.request.urlopen(url) as response:
                data = json.loads(response.read().decode("utf-8"))
                articles = data.get("articles", [])
                return [article["url"] for article in articles]
        except Exception as e:
            print(f"Error with GNews API: {e}")
            return []

if __name__ == "__main__":
    # Create an instance of the NewsLinkExtractor class
    extractor = NewsLinkExtractor()

    # Query to search news links
    query = "AI advancements 2024"

    # Try to extract news links using SerpAPI
    news_links = extractor.extract_links(query)

    # If no results found from SerpAPI, fallback to GNews API
    if not news_links:
        print("No results from SerpAPI, attempting to use GNews...")
        news_links = extractor.fallback_extract_links(query)

    # Print extracted news links
    if news_links:
        print("Found the following news links:")
        for link in news_links:
            print(link)
    else:
        print("No news links found.")

