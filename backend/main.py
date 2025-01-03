from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import asyncio

from images.graphicDetails import ImageProcessor
from images.cloudi import CloudinaryPost

from text.BERT_NLI_fakenews import TextClassifier
from text.text_ner import NERExtractor
from text.text_sentiment import SentimentAnalyzer

from toolkits.socialmediaToolkit.factCheck import FactCheckAPI
from toolkits.socialmediaToolkit.hashtagPredictor import HashtagPredictor
from toolkits.socialmediaToolkit.twitterHandleScraper import TwitterHandleScraper, TweetSaver

from toolkits.webToolkit.article_scraper import ArticleScraper
from toolkits.webToolkit.links_scraper import NewsLinkExtractor
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
    print()
    # # IMAGES

    # image_processor = ImageProcessor(file_path)
    # # deepfake= image_processor.detect_deepfake()
    # hehe = CloudinaryPost()
    # img_path = "/Users/vishrutgrover/coding/truthlens/TruthLens/images/deepfake.png"
    # response = hehe.upload(img_path)
    # # print(response['secure_url'])

    # # public_url = image_processor.post_to_imgur()

    # goog_lens_outp = image_processor.analyze_with_google_lens(response['secure_url'])
    # deepfake_outp = image_processor.detect_deepfake()
    # ocr_outp = image_processor.perform_ocr()

    # print("The image is", goog_lens_outp)
    # print()
    # print("The image is", deepfake_outp)
    # print()
    # print("The image is", ocr_outp)

    # # TEXT

    # # fake_news_detector nli (to train)
    # classifier = TextClassifier(model_name="vishgg/nli-xlm-roberta", tokenizer_name="xlm-roberta-base")
    # result = classifier.classify(
    #     "If you are sad and you know it clap your feet.", 
    #     "We are sad to announce the demise of Manmohan Singh."
    # )
    # print(result)

    # news_list = [
    #     "Apple is launching a new iPhone next week.",
    #     "Elon Musk visited the White House yesterday."
    # ]

    # ner_extractor = NERExtractor()
    # ner_extractor.extract_entities(news_list)

    # sentiment_analyzer = SentimentAnalyzer()
    # # Dynamic input for pipeline
    # text_input = "I am very happy."
    # result = sentiment_analyzer.analyze_sentiment(text_input)
    # print(f"Sentiment for the text '{text_input}': {result}")

    # # TOOLKITS

    # # SOCIAL MEDIA TOOLKIT

    fact_check_api = FactCheckAPI()
    # Example usage
    search_query = "Diljit Dosanjh meets Prime Minister Narendra Modi"
    result = fact_check_api.search(search_query)
    print(result)

    news = """
    Diljit Dosanjh recently had the opportunity to meet the Prime Minister of India, marking a significant and memorable moment in his journey. 
    This encounter not only highlights the growing recognition of influential figures from the entertainment industry but also underscores the importance of dialogue between cultural icons and national leaders. 
    Such meetings often pave the way for meaningful discussions and collaborations that can inspire positive change.
    """

    predictor = HashtagPredictor()
    hashtags = predictor.predict_hashtags(news)
    print(hashtags)

    # twitter_scraper = TwitterHandleScraper(handle=os.getenv("TWITTER_HANDLE"), api_token=os.getenv("TWITTER_HANDLE_API"))
    # tweets = twitter_scraper.scrape()
    # if tweets:
    #     TweetSaver.save(tweets)


    # # WEB BASED TOOLKIT
    # query = "Diljit Dosanjh meets Prime Minister Narendra Modi"

    # # Extract links
    # link_extractor = NewsLinkExtractor()
    # news_urls = link_extractor.extract_links(query)

    # # Fallback to GNews API if no links are found
    # if not news_urls:
    #     print("Using fallback link extractor.")
    #     news_urls = link_extractor.fallback_extract_links(query)

    # print("Extracted Links:")
    # for url in news_urls:
    #     print(url)

    # scraper = ArticleScraper()  # Scrape articles
    # max_articles_to_scrape = 5  # Dynamic input for max articles
    # articles = scraper.scrape_articles(news_urls, max_count=max_articles_to_scrape)

    # print("\nScraped Articles:")
    # for url, content in articles.items():
    #     print(f"URL: {url}\nContent: {content}\n")

    # scraper = TweetScraper(query=query)
    # asyncio.run(scraper.start_scraping())
        
if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0', port=5000)
    run_models("/Users/vishrutgrover/coding/truthlens/TruthLens/images/ss.png")