import requests
from dotenv import load_dotenv, find_dotenv
import os 
dotenv_path = find_dotenv()
load_dotenv(dotenv_path)


def fact_check_search(query, api_key):
    """
    Searches for fact-checking claims based on the query.

    Args:
        query (str): The search term or claim to fact-check.
        api_key (str): Your Google API key.

    Returns:
        dict: Parsed JSON response from the API.
    """
    url = "https://factchecktools.googleapis.com/v1alpha1/claims:search"
    params = {
        "languageCode": "en",
        "query": query,
        "key": api_key
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.json(), "status_code": response.status_code}

# Example Usage
if __name__ == "__main__":
    GOOGLE_FACTCHECK_API = os.getenv("GOOGLE_FACTCHECK_API")   # Replace with your actual API key
    search_query = "Color of apple is red"

    result = fact_check_search(search_query, GOOGLE_FACTCHECK_API)
    print(result)
