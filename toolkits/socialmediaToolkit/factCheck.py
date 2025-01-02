import requests
from dotenv import load_dotenv, find_dotenv
import os

class FactCheckAPI:
    """
    A class to interact with the Google Fact Check Tools API.
    """

    def __init__(self):
        """
        Initialize the FactCheckAPI instance with the API key.

        Args:
            api_key (str): Your Google API key.
        """
        self.api_key = os.getenv("GOOGLE_FACTCHECK_API")
        self.base_url = "https://factchecktools.googleapis.com/v1alpha1/claims:search"

    def search(self, query, language_code="en"):
        """
        Searches for fact-checking claims based on the query.

        Args:
            query (str): The search term or claim to fact-check.
            language_code (str): The language code for the query (default is 'en').

        Returns:
            dict: Parsed JSON response from the API.
        """
        params = {
            "languageCode": language_code,
            "query": query,
            "key": self.api_key
        }

        response = requests.get(self.base_url, params=params)

        if response.status_code == 200:
            return response.json()
        else:
            return {"error": response.json(), "status_code": response.status_code}

if __name__ == "__main__":
    # Load environment variables
    dotenv_path = find_dotenv()
    load_dotenv(dotenv_path)

    fact_check_api = FactCheckAPI()

    # Example usage
    search_query = "manmohan singh"
    result = fact_check_api.search(search_query)

    print(result)