import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv, find_dotenv
# Load environment variables
dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

class CloudinaryPost:
    def __init__(self):
        self.cloud_name = os.getenv("CLOUDINARY_NAME")
        self.api_key = os.getenv("CLOUDINARY_API_KEY")
        self.api_secret = os.getenv("CLOUDINARY_API_SECRET")
        
        # if not all([cloud_name, api_key, api_secret]):
        #     raise ValueError("Missing Cloudinary configuration. Ensure CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set.")

        cloudinary.config(
            cloud_name=self.cloud_name,
            api_key=self.api_key,
            api_secret=self.api_secret,
            secure=True
        )

    def upload(self, image_url):
        response = cloudinary.uploader.upload(image_url)
        return response        

if __name__ == "__main__":
    hehe = CloudinaryPost()
    img_path = "/Users/vishrutgrover/coding/truthlens/TruthLens/images/deepfake.png"
    response = hehe.upload(img_path)
    print(response['secure_url'])