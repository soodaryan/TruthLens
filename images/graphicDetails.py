from imgurpost import imgPost, use_google_lens
from imageDeepfake import imageDeepfakeAnalysis
from OCR import imgOCR
import os 
from dotenv import load_dotenv, find_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

if __name__ == "__main__":
    image_file = "images/ss.png" 
    public_url = imgPost(image_file, os.getenv("imgur_CLIENTID"))
    use_google_lens(public_url, os.getenv("googlelens_API"))
    imageDeepfakeAnalysis(image_file, os.getenv("deepfake_api_user"), os.getenv("deepfake_api_secret"))
    imgOCR(image_file, os.getenv("OCR_API_KEY"))
