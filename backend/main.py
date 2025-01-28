from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import asyncio
import sys
import os 
import json 
# Get the parent directory of the current script
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
# Add the parent directory to sys.path
sys.path.append(parent_dir)

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
# from toolkits.webToolkit.tweetScrapper import TweetScraper

from werkzeug.utils import secure_filename
from pymongo import MongoClient

from datetime import datetime

app = Flask(__name__)
CORS(app) 

# client = MongoClient("mongodb+srv://hemang_truthtell:hemang11062005@cluster0.u3oyruj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
# db = client["TuthTell"]
# form_collection = db["userInput"]

client = MongoClient(f"mongodb+srv://Ishan:testingbingo@bingo.bhqrq.mongodb.net/?retryWrites=true&w=majority&appName=Bingo")  
db = client["test"]
form_collection = db["TruthTell"]

print("Connected to MongoDB")

VIDEO_UPLOAD_FOLDER = './uploads/videos'
os.makedirs(VIDEO_UPLOAD_FOLDER, exist_ok=True)
app.config['VIDEO_UPLOAD_FOLDER'] = VIDEO_UPLOAD_FOLDER

@app.route('/upload-media', methods=['POST'])
def upload_media():
    print("Received media upload request")
    
    # Extract form data
    text_input = request.form.get("textInput", None)
    blog_links = request.form.get("relatedLinks", None)  # Match with 'blogLinks' in schema
    video_links = request.form.get("videoLinks", None)
    
    print("Form Data:", text_input, blog_links, video_links)
    # Initialize variables to store results
    uploaded_videos = []
    extracted_links = {
        "textInput": text_input if text_input else None,
        "blogLinks": json.loads(blog_links) if blog_links else None,
        "videoLinks": json.loads(video_links) if video_links else None,
    }

    try:
        if request.files:

        # Process uploaded files
            for key in request.files:
                file = request.files[key]
                if file.content_type.startswith('video/'):
                    save_path = os.path.normpath(os.path.join(app.config['VIDEO_UPLOAD_FOLDER'], file.filename))
                    # save_path = os.path.join(app.config['VIDEO_UPLOAD_FOLDER'], file.filename)
                    
                    file.save(save_path)
                    uploaded_videos.append(save_path)
                    print(f"Saved video {file.filename} at {save_path}")
                else:
                    print(f"Skipping unsupported file type: {file.content_type}")

        # Add the uploaded video paths to the extracted data
        extracted_links["videoPaths"] = uploaded_videos if uploaded_videos else None

        # Insert data (align with Mongoose schema)
        db_entry = {
            "textInput": extracted_links["textInput"],
            "videoLinks": extracted_links["videoLinks"],
            "blogLinks": extracted_links["blogLinks"],
            "videoPaths": extracted_links["videoPaths"],
            "createdAt": datetime.now()
        }
        form_collection.insert_one(db_entry)
        print("Inserted data into MongoDB:", db_entry)

        # Log all the extracted data for debugging
        print("Extracted Data:", extracted_links)

        return jsonify({
            "message": "Media uploaded, form data processed, and saved to MongoDB successfully!",
            "data": extracted_links
        }), 200

    except Exception as e:
        print("Error during processing:", str(e))
        return jsonify({"error": str(e)}), 500

def run_models(file_path):
    print()
    search_query = """Diljit Dosanjh recently had the opportunity to meet the Prime Minister of India, marking a significant and memorable moment in his journey. 
    This encounter not only highlights the growing recognition of influential figures from the entertainment industry but also underscores the importance of dialogue between cultural icons and national leaders. 
    Such meetings often pave the way for meaningful discussions and collaborations that can inspire positive change.Page: Diljit Dosanjh
    Summary: Diljit Dosanjh (born 6 January 1984) is an Indian singer, actor and film producer who works  in Punjabi and Hindi cinema. Dosanjh entered the Social 50 chart by Billboard in 2020. He has been featured in various music charts, including the Canadian Albums Chart, the UK Asian chart by Official Charts Company and the New Zealand Hot Singles. His films, including Jatt & Juliet 2, Sajjan Singh Rangroot and Honsla Rakh are among the highest grossing Punjabi films in history.
    Hailing from Dosanjh Kalan, Jalandhar, Dosanjh began his career in 2002 and gained recognition in Punjabi music with his albums Smile (2005) and Chocolate (2008), followed by The Next Level (2009) with Yo Yo Honey Singh. He had a cameo in the Punjabi movie Mel Karade Rabba in 2010 and began to pursue acting, debuting as a leading actor in the Punjabi movie The Lion of Punjab in 2011.
    He made his Bollywood debut in 2016 with the crime thriller Udta Punjab, for which he earned the Filmfare Award for Best Male Debut, in addition to a nomination for the Filmfare Award for Best Supporting Actor. This was followed by Good Newwz (2019), for which he received his second nomination for the Filmfare Award for Best Supporting Actor. As of 2020, he has won the PTC Award for Best Actor five times. He has also appeared as a judge in three seasons of the reality show Rising Star. 
    In 2020, Dosanjh charted on the Social 50 chart by Billboard with the release of his 11th album, G.O.A.T..
    In 2024, Diljit started global concert tour named as Dil Luminati.

    Page: Diljit Dosanjh discography
    Summary: Indian singer Diljit Dosanjh has released 13 studio albums, one extended plays, and 41 singles. In 2020, he entered the Social 50 chart by Billboard, following the release of his 11th album G.O.A.T. The album also entered the top 20 in the Canadian Albums Chart. His 12th album MoonChild Era charted at number 32 on the Canadian Albums Chart.

    Page: G.O.A.T. (Diljit Dosanjh album)
    Summary: G.O.A.T. is the eleventh studio album by Indian-Punjabi vocalist Diljit Dosanjh, released on July 30, 2020, by Famous Studios. Title track of the album and its music video was released a day prior to album release. Songs were written by Karan Aujla, Raj Ranjodh, Amrit Maan, and other artists. The album was produced by various artists including Desi Crew and The Kidd.

    Page: Narendra Modi
    Summary: Narendra Damodardas Modi (born 17 September 1950) is an Indian politician who has served as Prime Minister of India since 2014. Modi was the chief minister of Gujarat from 2001 to 2014 and is the member of parliament (MP) for Varanasi. He is a member of the Bharatiya Janata Party (BJP) and of the Rashtriya Swayamsevak Sangh (RSS), a right-wing Hindu nationalist paramilitary volunteer organisation. He is the longest-serving prime minister outside the Indian National Congress.
    Modi was born and raised in Vadnagar in northeastern Gujarat, where he completed his secondary education. He was introduced to the RSS at the age of eight. At the age of 18, he was married to Jashodaben Modi, whom he abandoned soon after, only publicly acknowledging her four decades later when legally required to do so. Modi became a full-time worker for the RSS in Gujarat in 1971. The RSS assigned him to the BJP in 1985 and he rose through the party hierarchy, becoming general secretary in 1998. In 2001, Modi was appointed Chief Minister of Gujarat and elected to the legislative assembly soon after. His administration is considered complicit in the 2002 Gujarat riots, and has been criticised for its management of the crisis. According to official records, a little over 1,000 people were killed, three-quarters of whom were Muslim; independent sources estimated 2,000 deaths, mostly Muslim. A Special Investigation Team appointed by the Supreme Court of India in 2012 found no evidence to initiate prosecution proceedings against him. While his policies as chief minister were credited for encouraging economic growth, his administration was criticised for failing to significantly improve health, poverty and education indices in the state.
    In the 2014 Indian general election, Modi led the BJP to a parliamentary majority, the first for a party since 1984. His administration increased direct foreign investment, and reduced spending on healthcare, education, and social-welfare programmes. Modi began a high-profile sanitation campaign, controversially initiated a demonetisation of banknotes and introduced the Goods and Services Tax, and weakened or abolished environmental and labour laws. Modi's administration launched the 2019 Balakot airstrike against an alleged terrorist training camp in Pakistan. The airstrike failed, but the action had nationalist appeal. Modi's party won the 2019 general election which followed. In its second term, his administration revoked the special status of Jammu and Kashmir, and introduced the Citizenship Amendment Act, prompting widespread protests, and spurring the 2020 Delhi riots in which Muslims were brutalised and killed by Hindu mobs. Three controversial farm laws led to sit-ins by farmers across the country, eventually causing their formal repeal. Modi oversaw India's response to the COVID-19 pandemic, during which, according to the World Health Organization's estimates, 4.7 million Indians died. In the 2024 general election, Modi's party lost its majority in the lower house of Parliament and formed a government leading the National Democratic Alliance coalition.
    Under Modi's tenure, India has experienced democratic backsliding, or the weakening of democratic institutions, individual rights, and freedom of expression. As prime minister, he has received consistently high approval ratings. Modi has been described as engineering a political realignment towards right-wing politics. He remains a controversial figure domestically and internationally, over his Hindu nationalist beliefs and handling of the Gujarat riots, which have been cited as evidence of a majoritarian and exclusionary social agenda.
    """

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
    news_list = [
        search_query
    ]

    #ner
    ner_extractor = NERExtractor()
    ner_extractor.extract_entities(news_list)

    # sentiment
    sentiment_analyzer = SentimentAnalyzer()
    text_input = search_query
    result = sentiment_analyzer.analyze_sentiment(text_input)
    print(f"Sentiment for the text '{text_input}': {result}")
     
    # # TOOLKITS

    # # SOCIAL MEDIA TOOLKIT

    # fact_check_api = FactCheckAPI()
    # # Example usage
    
    # result = fact_check_api.search(search_query)
    # print(result)

    # news = """
    # Diljit Dosanjh recently had the opportunity to meet the Prime Minister of India, marking a significant and memorable moment in his journey. 
    # This encounter not only highlights the growing recognition of influential figures from the entertainment industry but also underscores the importance of dialogue between cultural icons and national leaders. 
    # Such meetings often pave the way for meaningful discussions and collaborations that can inspire positive change.
    # """

    # predictor = HashtagPredictor()
    # hashtags = predictor.predict_hashtags(news)
    # print(hashtags)

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
    
    # nli
    # classifier = TextClassifier(model_name="vishgg/nli-xlm-roberta", tokenizer_name="xlm-roberta-base")
    # result = classifier.classify(
    #     search_query,
    #     articles
    # )
    # print(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    # run_models("/Users/vishrutgrover/coding/truthlens/TruthLens/images/ss.png")
    
    
   