# from serpapi import GoogleSearch
# from dotenv import load_dotenv, find_dotenv
# import os 
# from langchain_community.utilities import GoogleSerperAPIWrapper


# dotenv_path = find_dotenv()
# load_dotenv(dotenv_path)
# os.environ["SERPER_API_KEY"] = os.getenv("SERPER_API_KEY")

  
# search_serper = GoogleSerperAPIWrapper()
# params = {
#   "engine": "google_news",
#   "q": "Manmoahn Singh died",
#   "gl": "us",
#   "hl": "en",
#   "api_key": os.getenv("SERP_API_KEY")
# }

# search = GoogleSearch(params)
# results = search.get_dict()
# news_results = results["news_results"]
# news_url=[]
# for news_result in news_results:
#   # print(f"Title: {news_result['title']}\nLink: {news_result['link']}\nSource: {news_result['source']}\n")
#   news_url.append(news_result['link'])
# # print(f"Total news articles: {len(news_results)}")
# # print(news_url)

# for url in news_url:
#   print("URL: ", url)
#   print(search_serper.run(url))