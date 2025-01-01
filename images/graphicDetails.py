import os
from dotenv import load_dotenv, find_dotenv
from imgurpost import imgPost, use_google_lens
from TruthLens.images import ImageFakeDetector
from OCR import imgOCR

# Load environment variables
dotenv_path = find_dotenv()
load_dotenv(dotenv_path)


class ImageProcessor:
    def __init__(self, image_file):
        self.imdetect = ImageFakeDetector()
        self.image_file = image_file
        # Fetch API keys from environment variables within the class
        self.imgur_client_id = os.getenv("imgur_CLIENTID")
        self.google_lens_api_key = os.getenv("googlelens_API")
        self.ocr_api_key = os.getenv("OCR_API_KEY")

    def post_to_imgur(self):
        return imgPost(self.image_file, self.imgur_client_id)

    def analyze_with_google_lens(self, public_url):
        use_google_lens(public_url, self.google_lens_api_key)

    def detect_deepfake(self):
        self.imdetect.detect_deepfake(image_path=self.image_file)

    def perform_ocr(self):
        imgOCR(self.image_file, self.ocr_api_key)


if __name__ == "__main__":
    # Configuration and file path
    image_file = "/home/hemant/TruthTell/TruthLens/images/ss.png"

    # Instantiate the ImageProcessor class
    image_processor = ImageProcessor(image_file)

    # Process image using the methods
    public_url = image_processor.post_to_imgur()
    image_processor.analyze_with_google_lens(public_url)
    image_processor.detect_deepfake()
    image_processor.perform_ocr()