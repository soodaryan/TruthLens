import os 
import json
import requests
from dotenv import load_dotenv, find_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

def detect_deepfake (file = 'images/deepfake.png') : 

    """
    Detects Deepfake and return Real/Fake
    """

    params = {

        'models': 'deepfake',
        'api_user': os.getenv("SIGHTENGINE_USER"),
        'api_secret': os.getenv("SIGHTENGINE_API_KEY")
        
    }

    files = {'media': open(file, 'rb')}
    r = requests.post('https://api.sightengine.com/1.0/check.json', files=files, data=params)

    output = json.loads(r.text)

    if output["type"]["deepfake"]>0.2:
        print("Fake")
    else:
        print("Real")


def detect_genai (imageurl): 

    """
    Detects AI generated image using genai model and return Real/Fake
    """

    params = {

        'models': 'genai',
        'api_user': os.getenv("SIGHTENGINE_USER"),
        'api_secret': os.getenv("SIGHTENGINE_API_KEY")

    }

    files = {'media': open(imageurl, 'rb')}
    resp = requests.post('https://api.sightengine.com/1.0/check.json', files=files, data=params)

    output = json.loads(resp.text)
    print(json.dumps(output, indent=2))

if __name__ == "__main__":
    image_path = "images/ss.png"
    detect_genai(image_path)
    detect_deepfake('images/deepfake.png')