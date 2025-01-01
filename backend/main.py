from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app) 

IMAGE_UPLOAD_FOLDER = './uploads/images'
VIDEO_UPLOAD_FOLDER = './uploads/videos'

os.makedirs(IMAGE_UPLOAD_FOLDER, exist_ok=True)
os.makedirs(VIDEO_UPLOAD_FOLDER, exist_ok=True)

app.config['IMAGE_UPLOAD_FOLDER'] = IMAGE_UPLOAD_FOLDER
app.config['VIDEO_UPLOAD_FOLDER'] = VIDEO_UPLOAD_FOLDER

@app.route('/upload-media', methods=['POST'])
def upload_media():
    if not request.files:
        return jsonify({"error": "No files uploaded"}), 400

    try:
        for key in request.files:
            file = request.files[key]
            if file.content_type.startswith('image/'):
                save_path = os.path.join(app.config['IMAGE_UPLOAD_FOLDER'], file.filename)
                file.save(save_path)
                print(f"Saved {file.filename} at {save_path}")
                run_models(save_path)
            elif file.content_type.startswith('video/'):
                save_path = os.path.join(app.config['VIDEO_UPLOAD_FOLDER'], file.filename)
                file.save(save_path)
                print(f"Saved {file.filename} at {save_path}")

            else:
                continue  # Skip unsupported file types

            
        return jsonify({"message": "All media uploaded successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

def run_models(file_path):
    print()



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
