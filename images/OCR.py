import requests
import os
from dotenv import load_dotenv, find_dotenv

class OCRService:
    def __init__(self, api_key):
        dotenv_path = find_dotenv()
        load_dotenv(dotenv_path)
        self.api_key = api_key
        self.api_endpoint = "https://api.ocr.space/parse/imageurl"

    def imgOCR(self, image_url):
        params = {
            "apikey": self.api_key,
            "url": image_url
        }

        try:
            response = requests.get(self.api_endpoint, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

if __name__ == "__main__":
    ocr_service = OCRService(os.getenv("OCR_API_KEY"))
    image_url = "https://imgur.com/truthlens-XIJEVXw"
    result = ocr_service.imgOCR(image_url)
    print(result)