import os
import yt_dlp

def download_youtube_video(link, save_path="./upload/videos"):
    """
    Download a YouTube video using yt-dlp and save it to the specified path.
    
    :param link: URL of the YouTube video
    :param save_path: Path to save the downloaded video
    """
    # Ensure the save path exists
    if not os.path.exists(save_path):
        os.makedirs(save_path)
        print(f"Created save path: {save_path}")

    # Set yt-dlp options
    ydl_opts = {
        'format': 'best',
        'outtmpl': os.path.join(save_path, '%(title)s.%(ext)s'),  # Save video with title and extension
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            print("Downloading video...")
            ydl.download([link])
        print("Video downloaded successfully!")
    except Exception as e:
        print(f"An error occurred during download: {str(e)}")

if __name__ == "__main__":
    # Your YouTube video link
    LINK = "https://www.youtube.com/watch?v=j3CkXcUU4j4&t=214s&ab_channel=Firstpost"
    
    # Call the function with the specified save path
    download_youtube_video(LINK, save_path="./upload/videos")
