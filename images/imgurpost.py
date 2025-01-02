import requests
import time
import os
from dotenv import load_dotenv, find_dotenv

# Load environment variables
dotenv_path = find_dotenv()
load_dotenv(dotenv_path)


class ImgurProcessor:
    def __init__(self, image_path):
        self.image_path = image_path
        self.imgur_client_id = os.getenv("imgur_CLIENTID")
        self.google_lens_api_key = os.getenv("googlelens_API")

    # def img_post(self):
    #     """Post image to Imgur and return the public URL."""
    #     url = "https://api.imgur.com/3/image"
    #     payload = {
    #         'type': 'image',
    #         'title': 'TruthLens',
    #         'description': ' '
    #     }
    #     files = [
    #         ('image', ('GHJQTpX.jpeg', open(self.image_path, 'rb'), 'image/jpeg'))
    #     ]
    #     headers = {
    #         'Authorization': f'Client-ID {self.imgur_client_id}'
    #     }

    #     response = requests.post(url, headers=headers, data=payload, files=files)
    #     time.sleep(2)
    #     print(response.text)
    #     return response.json()['data']['link']

    def use_google_lens(self, public_url):
        """Use Google Lens API to analyze the image."""
        print(f"Image URL for Google Lens: {public_url}")

        params = {
            "api_key": self.google_lens_api_key,
            "engine": "google_lens",
            "url": public_url,
        }
        
        api_endpoint = "https://serpapi.com/search.json?engine={engine}&url={url}&api_key={api_key}"
        try:
            response = requests.get(api_endpoint, params=params)
            response.raise_for_status()
            print(response.json())
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}


# def main():
#     image_file = "/home/hemant/TruthTell/TruthLens/images/ss.png"
#     image_processor = ImgurProcessor(image_file)

#     public_url = image_processor.img_post()
#     image_processor.use_google_lens(public_url)


# if __name__ == "__main__":
#     main()
