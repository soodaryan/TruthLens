import cv2
import numpy as np
from skimage.metrics import structural_similarity as compare_ssim
import base64 
import requests
# Load models and processors
from transformers import AutoProcessor, AutoModelForImageTextToText, AutoModelForSpeechSeq2Seq

blip_processor = AutoProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
blip_model = AutoModelForImageTextToText.from_pretrained("Salesforce/blip-image-captioning-base")

processor = AutoProcessor.from_pretrained("openai/whisper-small")
model = AutoModelForSpeechSeq2Seq.from_pretrained("openai/whisper-small")




def extract_frames(video_path, frame_rate=1):
    """
    Extract frames from the video at a given frame rate.
    Args:
        video_path (str): Path to the input video file.
        frame_rate (int): Number of frames per second to capture.
    Returns:
        list: List of frames extracted from the video.
    """
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print(f"Error: Cannot open video file '{video_path}'. Check the file path.")
        return []

    frames = []
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    if fps == 0:
        print("Error: FPS value could not be retrieved from the video file.")
        return []

    interval = max(1, int(fps / frame_rate))

    print(f"Video FPS: {fps}, Frame extraction interval: {interval}")
    success, frame = cap.read()
    count = 0

    while success:
        if count % interval == 0:
            frames.append(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        success, frame = cap.read()
        count += 1

    cap.release()
    print(f"Total frames extracted: {len(frames)}")
    return frames

def get_unique_frames(frames, threshold=0.98):
    """
    Filter out similar frames based on SSIM (Structural Similarity Index).
    Args:
        frames (list): List of video frames.
        threshold (float): SSIM threshold to decide if frames are similar.
    Returns:
        list: List of unique frames.
    """
    unique_frames = [frames[0]]  # Always include the first frame

    for i in range(1, len(frames)):
        # Resize frames to the same dimensions for comparison
        prev_frame = cv2.resize(unique_frames[-1], (224, 224))
        curr_frame = cv2.resize(frames[i], (224, 224))
        
        # Convert to grayscale for SSIM
        prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_RGB2GRAY)
        curr_gray = cv2.cvtColor(curr_frame, cv2.COLOR_RGB2GRAY)
        
        # Calculate SSIM
        score, _ = compare_ssim(prev_gray, curr_gray, full=True)
        
        # If frames are dissimilar enough, add the current frame to unique frames
        if score < threshold:
            unique_frames.append(frames[i])
    
    return unique_frames

def detect_web_using_api_key(api_key, image):
    """Detects web annotations for an image using Google Vision API and an API key."""
    # Convert the image to base64 format
    _, img_encoded = cv2.imencode('.jpg', image)
    content = base64.b64encode(img_encoded).decode("utf-8")
    
    # Vision API URL
    url = f"https://vision.googleapis.com/v1/images:annotate?key={api_key}"
    
    # Prepare the request payload
    request_body = {
        "requests": [
            {
                "image": {"content": content},
                "features": [{"type": "WEB_DETECTION"}],
            }
        ]
    }
    
    # Send the POST request to the Vision API
    response = requests.post(url, json=request_body)
    web_entities = []
    if response.status_code == 200:
        annotations = response.json().get("responses", [])[0].get("webDetection", {})
        
        # Process and print web annotations
        if "bestGuessLabels" in annotations:
            for label in annotations["bestGuessLabels"]:
                print(f"\nBest guess label: {label.get('label')}")
        
        
        
        
        # web_entities = []
        if "webEntities" in annotations:
            print(f"\n{len(annotations['webEntities'])} Web entities found: ")
            for entity in annotations["webEntities"]:
                score = entity.get('score')
                description = entity.get('description')
                if score > 0.65:
                    web_entities.append(description)
                    print("Appending to web_entities : ", description)
                print(f"\n\tScore      : {score}")
                print(f"\tDescription: {description}")
               
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        
    return web_entities    

def generate_captions_with_blip(frames):
    """Generate captions for frames using BLIP."""
    captions = []
    for frame in frames:
        inputs = blip_processor(images=frame, return_tensors="pt")
        caption = blip_model.generate(**inputs)
        captions.append(blip_processor.decode(caption[0], skip_special_tokens=True))
    
    for i, caption in enumerate(captions):
        print(f"Frame {i+1} Caption: {caption}")
        
    return captions

def video_analysis_pipeline(video_path, api_key):
    """Full video analysis pipeline using CLIP and BLIP."""
    
    # Step 1: Extract frames
    print("Extracting frames from the video...")
    frames = extract_frames(video_path, frame_rate=3)
    
    # Step 2: Get unique frames
    print("Filtering unique frames...")
    unique_frames = get_unique_frames(frames, threshold=0.9)
    print(f"Number of unique frames: {len(unique_frames)}")
    
    # Step 4: BLIP Captioning
    print("Generating captions for unique frames with BLIP...")
    captions = generate_captions_with_blip(unique_frames)
    BLIP_captions = set() 
    for caption in captions:
        BLIP_captions.add(caption)
    print(f"Number of unique captions: {len(BLIP_captions)}")
    
    for idx, frame in enumerate(unique_frames):
        print(f"Analyzing unique frame {idx + 1} with Google Vision API...")
        detect_web_using_api_key(api_key, frame)
    
# Example usage
video_path = r"C:\Users\itsta\OneDrive\Desktop\HEMANG\TruthLens\toolkits\webToolkit\aims.mp4"
api_key = "AIzaSyCA1lsOyd5UFwk2OqOTNDb6J-gz5rwIvkk"
video_analysis_pipeline(video_path, api_key)
