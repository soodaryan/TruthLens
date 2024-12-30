# import json
# import urllib.request
# from dotenv import load_dotenv, find_dotenv
# import os 
# dotenv_path = find_dotenv()
# load_dotenv(dotenv_path)

# apikey = os.getenv("gnews_api_key")
# query = "covid"
# url = f"https://gnews.io/api/v4/search?q={query}&lang=en&country=us&max=10&apikey={apikey}"

# with urllib.request.urlopen(url) as response:
#     data = json.loads(response.read().decode("utf-8"))
#     articles = data["articles"]
#     for i in range(len(articles)):
#         print(f"Title: {articles[i]['title']}")
#         print(f"Description: {articles[i]['description']}")
#         print(f"{articles[i]}")
#         print(f"Source: {articles[i]['source']['name']}")
#         print(f"URL: {articles[i]['url']}")
#         print(f"Published at: {articles[i]['publishedAt']}")
#         print("\n")
        
#         break
    