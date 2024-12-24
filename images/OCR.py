import requests
import os 
from dotenv import load_dotenv, find_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)


def imgOCR(image_url, OCR_api_key):
    """
    Calls the OCR API with the given image URL and returns the parsed response.
    """
    api_key = OCR_api_key
    api_endpoint = "https://api.ocr.space/parse/imageurl"
    params = {
        "apikey": api_key,
        "url": image_url
    }

    try:
        response = requests.get(api_endpoint, params=params)
        response.raise_for_status()  
        print(response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

if __name__ == "__main__":
    image_url = "https://imgur.com/truthlens-XIJEVXw"
    imgOCR(image_url, os.getenv("OCR_API_KEY"))

