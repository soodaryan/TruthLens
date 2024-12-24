import requests
import time
import os 
from dotenv import load_dotenv, find_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

def imgPost(image_path, imgur_CLIENTID):
    url = "https://api.imgur.com/3/image"

    payload={'type': 'image',
    'title': 'TruthLens',
    'description': ' '}
    files=[
    ('image',('GHJQTpX.jpeg',open(image_path,'rb'),'image/jpeg'))
    ]
    headers = {
    'Authorization': f'Client-ID {imgur_CLIENTID}'
    }

    response = requests.request("POST", url, headers=headers, data=payload, files=files)
    time.sleep(2)
    print(response.text)
    return response.json()['data']['link']

def use_google_lens(public_url, api_key):
    """Use Google Lens API to analyze the image."""
    image_url = f"{public_url}"
    print(f"Image URL for Google Lens: {image_url}")
    
    params = {
    "api_key": api_key,
    "engine": "google_lens",
    "url": image_url,
    }
    api_endpoint = "https://serpapi.com/search.json?engine={engine}&url={url}&api_key={api_key}"
    try:
        response = requests.get(api_endpoint, params=params)
        response.raise_for_status()  
        print(response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

def main():
    image_file = "images/ss.png" 
    public_url = imgPost(image_file, os.getenv("imgur_CLIENTID"))
    use_google_lens(public_url, os.getenv("googlelens_API"))
    

if __name__ == "__main__":
    main()
