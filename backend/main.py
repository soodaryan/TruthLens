from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Directory to save uploaded videos
UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Route to handle video uploads
@app.route('/upload-video', methods=['POST'])
def upload_video():
    if 'video_0' not in request.files:
        return jsonify({"error": "No files uploaded"}), 400

    try:
        for key in request.files:
            video = request.files[key]
            if video:
                save_path = os.path.join(app.config['UPLOAD_FOLDER'], video.filename)
                video.save(save_path)
                print(f"Saved {video.filename} at {save_path}")
        return jsonify({"message": "All videos uploaded successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Health check route
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"message": "Backend is running!"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
