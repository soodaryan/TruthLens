import os
import subprocess
import time
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from serpapi import GoogleSearch
import requests

class ImageHTTPRequestHandler(BaseHTTPRequestHandler):
    image_file = None  

    def do_GET(self):
        """Handle GET requests."""
        
        print(self.image_file)
        try:
            with open(self.image_file, 'rb') as file:
                self.send_response(200)
                self.send_header('Content-type', 'image/png')
                self.end_headers()
                self.wfile.write(file.read())
        except FileNotFoundError:
            self.send_error(404, "Image not found")

def start_local_server(image_file, port=8000):
    """Starts a local HTTP server to serve the image."""
    if not os.path.isfile(image_file):
        print(f"Image file not found: {image_file}")
        return None

    ImageHTTPRequestHandler.image_file = image_file
    
    server_address = ('', port)
    httpd = HTTPServer(server_address, ImageHTTPRequestHandler)
    print(f"Serving image at http://localhost:{port}/")
    
    webbrowser.open(f'http://localhost:{port}/')
    return httpd

def start_ngrok(port=8000):
    """Start ngrok and return the public URL."""
    try:
        # Start the ngrok process
        ngrok_process = subprocess.Popen(["ngrok", "http", str(port)], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print("Starting ngrok...")
        time.sleep(5)  # Allow time for ngrok to initialize

        # Fetch tunnel details from the ngrok API
        response = requests.get("http://localhost:4040/api/tunnels")
        response.raise_for_status()
        public_url = response.json()["tunnels"][0]["public_url"]

        # Notify the user about the public URL
        print(f"ngrok public URL: {public_url}")

        return public_url, ngrok_process
    except Exception as e:
        print(f"Error starting ngrok: {e}")
        return None, None

def use_google_lens(public_url, api_key):
    # time.sleep()
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
    api_key = "79aa6b8adbffdbb4ad7d685307f9befbc23734b41ef7587b2c67173d5b056256" 
    httpd = start_local_server(image_file)
    if not httpd:
        print("Failed to start local server. Exiting...")
        return

    public_url, ngrok_process = start_ngrok()
    if not public_url:
        print("Failed to start ngrok. Exiting...")
        return

    use_google_lens(public_url, api_key)
    
    try:
        print("Server is running. Press Ctrl+C to stop.")
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("Shutting down server...")
        httpd.shutdown()
        ngrok_process.terminate()

if __name__ == "__main__":
    main()


