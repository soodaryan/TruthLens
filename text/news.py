import requests

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
    API_KEY = "AIzaSyC7HUXAJ6TITc0TLL_LI9l8WAIHMYiytpk"  # Replace with your actual API key
    search_query = "Color of apple is red"

    result = fact_check_search(search_query, API_KEY)
    print(result)
    
    # if "error" not in result:
    #     print("Fact Check Results:")
    #     for claim in result.get("claims", []):
    #         print(f"Claim: {claim['text']}")
    #         print(f"Claimant: {claim.get('claimant', 'Unknown')}")
    #         print(f"Claim Date: {claim.get('claimDate', 'Unknown')}")
    #         print(f"Rating: {claim['claimReview'][0]['textualRating'] if 'claimReview' in claim else 'No Rating'}")
    #         print(f"Publisher: {claim['claimReview'][0]['publisher']['name'] if 'claimReview' in claim else 'Unknown'}")
    #         print("-" * 80)
    # else:
    #     print(f"Error: {result['error']} (Status Code: {result['status_code']})")
