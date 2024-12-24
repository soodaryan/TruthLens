import requests 
import json

import os 
from dotenv import load_dotenv, find_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

def imageDeepfakeAnalysis(imageurl, deepfake_api_user, deepfake_api_secret): 
    params = {
    'models': 'genai',
    'api_user': deepfake_api_user,
    'api_secret': deepfake_api_secret
    }
    files = {'media': open(imageurl, 'rb')}
    r = requests.post('https://api.sightengine.com/1.0/check.json', files=files, data=params)

    output = json.loads(r.text)
    print(json.dumps(output, indent=2))

if __name__ == "__main__":
    image_path = "images/ss.png"
    imageDeepfakeAnalysis(image_path, os.getenv("deepfake_api_user"), os.getenv("deepfake_api_secret"))