from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import asyncio

from images.graphicDetails import ImageProcessor
from images.cloudi import CloudinaryPost

# from text.fake_news_detection import
from text.text_ner import NERExtractor
from text.text_sentiment import SentimentAnalyzer

from toolkits.socialmediaToolkit.factCheck import FactCheckAPI
from toolkits.socialmediaToolkit.hashtagPredictor import HashtagPredictor
from toolkits.socialmediaToolkit.twitterHandleScraper import TwitterHandleScraper, TweetSaver

from toolkits.webToolkit.article_scraper import ArticleScraper
from toolkits.webToolkit.GoogleSeach_serpapi_links_scraper import NewsLinkExtractor
from toolkits.webToolkit.tweetScrapper import TweetScraper

app = Flask(__name__)
CORS(app) 

IMAGE_UPLOAD_FOLDER = './uploads/images'
VIDEO_UPLOAD_FOLDER = './uploads/videos'

os.makedirs(IMAGE_UPLOAD_FOLDER, exist_ok=True)
os.makedirs(VIDEO_UPLOAD_FOLDER, exist_ok=True)

app.config['IMAGE_UPLOAD_FOLDER'] = IMAGE_UPLOAD_FOLDER
app.config['VIDEO_UPLOAD_FOLDER'] = VIDEO_UPLOAD_FOLDER

@app.route('/upload-media', methods=['POST'])
def upload_media():
    if not request.files:
        return jsonify({"error": "No files uploaded"}), 400

    try:
        for key in request.files:
            file = request.files[key]
            if file.content_type.startswith('image/'):
                save_path = os.path.join(app.config['IMAGE_UPLOAD_FOLDER'], file.filename)
                file.save(save_path)
                print(f"Saved {file.filename} at {save_path}")
                run_models(save_path)
            elif file.content_type.startswith('video/'):
                save_path = os.path.join(app.config['VIDEO_UPLOAD_FOLDER'], file.filename)
                file.save(save_path)
                print(f"Saved {file.filename} at {save_path}")

            else:
                continue  # Skip unsupported file types

            
        return jsonify({"message": "All media uploaded successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

def run_models(file_path):
    # IMAGES

    image_processor = ImageProcessor(file_path)
    # deepfake= image_processor.detect_deepfake()
    hehe = CloudinaryPost()
    img_path = "/Users/vishrutgrover/coding/truthlens/TruthLens/images/deepfake.png"
    response = hehe.upload(img_path)
    # print(response['secure_url'])

    # public_url = image_processor.post_to_imgur()

    goog_lens_outp = image_processor.analyze_with_google_lens(response['secure_url'])
    deepfake_outp = image_processor.detect_deepfake()
    ocr_outp = image_processor.perform_ocr()

    print("The image is", goog_lens_outp)
    print()
    print("The image is", deepfake_outp)
    print()
    print("The image is", ocr_outp)

    # TEXT

    # fake_news_detector nli (to train)


    news_list = [
        "Apple is launching a new iPhone next week.",
        "Elon Musk visited the White House yesterday."
    ]

    ner_extractor = NERExtractor()
    ner_extractor.extract_entities(news_list)

    sentiment_analyzer = SentimentAnalyzer()
    # Dynamic input for pipeline
    text_input = "I am very happy."
    result = sentiment_analyzer.analyze_sentiment(text_input)
    print(f"Sentiment for the text '{text_input}': {result}")

    # TOOLKITS

    # SOCIAL MEDIA TOOLKIT

    fact_check_api = FactCheckAPI()
    # Example usage
    search_query = "manmohan singh"
    result = fact_check_api.search(search_query)
    print(result)

    news = """
    Pushpa 2 Sandhya Theatre tragedy: Dil Raju says 'whole film industry' will meet CM Revanth Reddy
    Dil Raju, shared that Telangana CM Revanth Reddy has assured that he will act as a bridge between the Telangana Film Development Corporation and the government.
    Dil Raju visited KIMS Hospital in Secunderabad, Hyderabad, to meet Sri Tej's family. Speaking to ANI, he revealed that he had previously met Telangana Chief Minister Revanth Reddy to discuss providing support to Sri Tej's family, ensuring that both the film industry and government would offer all necessary assistance.
    """
    predictor = HashtagPredictor()
    hashtags = predictor.predict_hashtags(news)
    print(hashtags)

    twitter_scraper = TwitterHandleScraper(handle=os.getenv("TWITTER_HANDLE"), api_token=os.getenv("TWITTER_HANDLE_API"))
    tweets = twitter_scraper.scrape()
    if tweets:
        TweetSaver.save(tweets)


    # WEB TOOLKIT
        
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

    scraper = ArticleScraper()  # Scrape articles
    max_articles_to_scrape = 5  # Dynamic input for max articles
    articles = scraper.scrape_articles(news_urls, max_count=max_articles_to_scrape)

    print("\nScraped Articles:")
    for url, content in articles.items():
        print(f"URL: {url}\nContent: {content}\n")

    query = 'ISRO Satellite'  # Assign your query string here
    scraper = TweetScraper(query=query)
    asyncio.run(scraper.start_scraping())
        
if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0', port=5000)
    run_models("/Users/vishrutgrover/coding/truthlens/TruthLens/images/ss.png")