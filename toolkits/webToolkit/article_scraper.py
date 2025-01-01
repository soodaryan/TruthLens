from dotenv import load_dotenv, find_dotenv
import os 
from langchain_community.utilities import GoogleSerperAPIWrapper
from GoogleSeach_serpapi_links_scraper import NewsLinkExtractor

class ArticleScraper:
    def __init__(self):
        """Initializes the ArticleScraper with the Serper API Wrapper."""
        dotenv_path = find_dotenv()
        load_dotenv(dotenv_path)
        os.environ["SERPER_API_KEY"] = os.getenv("SERPER_API_KEY")
        self.scraper = GoogleSerperAPIWrapper()

    def scrape_articles(self, urls, max_count=5):
        """Scrapes the content of articles given a list of URLs.

        Args:
            urls (list): List of article URLs to scrape.
            max_count (int): Maximum number of articles to scrape. Defaults to 5.

        Returns:
            dict: Dictionary with URLs as keys and article contents or error messages as values.
        """
        articles = {}
        count = 0
        for url in urls:
            if count >= max_count:
                break
            try:
                articles[url] = self.scraper.run(url)
                count += 1
            except Exception as e:
                articles[url] = f"Error: {e}"
        return articles
    

if __name__ == "__main__":
    # Example pipeline integration
    query = "Manmohan Singh died"  # Replace with dynamic input

    # Extract links
    link_extractor = NewsLinkExtractor()
    news_urls = link_extractor.extract_links(query)

    # Fallback to GNews API if no links are found
    if not news_urls:
        print("Using fallback link extractor.")
        news_urls = link_extractor.fallback_extract_links(query)

    print("Extracted Links:")
    for url in news_urls:
        print(url)

    # Scrape articles
    scraper = ArticleScraper()
    max_articles_to_scrape = 5  # Dynamic input for max articles
    articles = scraper.scrape_articles(news_urls, max_count=max_articles_to_scrape)

    # Output results
    print("\nScraped Articles:")
    for url, content in articles.items():
        print(f"URL: {url}\nContent: {content}\n")