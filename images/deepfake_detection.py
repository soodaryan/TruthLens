import os
import json
import requests
from dotenv import load_dotenv, find_dotenv

# Load environment variables
dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

class ImageFakeDetector:
    def __init__(self):
        """Initialize the detector with the image path."""
        self.params = {
            'api_user': os.getenv("SIGHTENGINE_USER"),
            'api_secret': os.getenv("SIGHTENGINE_API_KEY"),
            'deepfake_api_user': os.getenv("deepfake_api_user"),
            'deepfake_api_secret': os.getenv("deepfake_api_secret")
        }

    def detect_genai(self, image_path):
        """Detects AI-generated images using GenAI model."""
        try:
            files = {'media': open(image_path, 'rb')}
            params = {**self.params, 'models': 'genai'}
            resp = requests.post('https://api.sightengine.com/1.0/check.json', files=files, data=params)
            output = json.loads(resp.text)
            print("GenAI Detection Output:", json.dumps(output, indent=2))
            return output.get("type", {}).get("genai", 0) > 0.2
        except Exception as e:
            print(f"Error in GenAI detection: {e}")
            return False

    def detect_deepfake(self, image_path):
        """Detects deepfake images as a fallback."""
        try:
            files = {'media': open(image_path, 'rb')}
            params = {**self.params, 'models': 'deepfake'}
            resp = requests.post('https://api.sightengine.com/1.0/check.json', files=files, data=params)
            output = json.loads(resp.text)
            if output["type"]["deepfake"] > 0.2:
                print("Fake")
            else:
                print("Real")
        except Exception as e:
            print(f"Error in Deepfake detection: {e}")
            print("Error detecting deepfake.")

    def detect_fake(self, image_path):
        """Tries GenAI detection first, falls back to Deepfake detection if needed."""
        if not self.detect_genai(image_path):
            print("Fallback to Deepfake detection.")
            self.detect_deepfake(image_path)

if __name__ == "__main__":
    image_path = "/home/hemant/TruthTell/TruthLens/images/deepfake.png"
    detector = ImageFakeDetector()
    detector.detect_fake(image_path)