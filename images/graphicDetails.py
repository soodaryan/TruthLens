import os
from dotenv import load_dotenv, find_dotenv
from images.imgurpost import ImgurProcessor
from images.deepfake_detection import ImageFakeDetector
from images.OCR import OCRService

# Load environment variables
dotenv_path = find_dotenv()
load_dotenv(dotenv_path)


class ImageProcessor:
    def __init__(self, image_file):
        # Fetch API keys from environment variables within the class
        self.image_file = image_file
        self.image_fake = ImageFakeDetector()
        self.imgur_processor = ImgurProcessor(image_file)
        self.img_ocr_service = OCRService()

    def post_to_imgur(self):
        return self.imgur_processor.img_post()

    def analyze_with_google_lens(self, public_url):
        self.imgur_processor.use_google_lens(public_url)

    def detect_deepfake(self):
        self.image_fake.detect_deepfake(image_path=self.image_file)

    def perform_ocr(self):
        self.img_ocr_service.imgOCR(self.image_file)


# if __name__ == "__main__":
#     # Configuration and file path
#     image_file = "/home/hemant/TruthTell/TruthLens/images/ss.png"

#     # Instantiate the ImageProcessor class
#     image_processor = ImageProcessor(image_file)

#     # Process image using the methods
#     public_url = image_processor.post_to_imgur()
#     image_processor.analyze_with_google_lens(public_url)
#     image_processor.detect_deepfake()
#     image_processor.perform_ocr()