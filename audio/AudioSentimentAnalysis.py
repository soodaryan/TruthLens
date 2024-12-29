import os
import assemblyai as aai
from SpeechToText.AudioProcessor import STT
from text.SentimentAnalysis import get_sentiment, initialize_models

os.environ["ASSEMBLYAI_API_KEY"] = os.getenv("ASSEMBLYAI_API_KEY")


def getSentiment(audio_file = "realnews.mp4") : 

    """Returns the sentiment of input news audio/video file"""
    
    aai.settings.api_key = os.getenv("ASSEMBLYAI_API_KEY")

    config = aai.TranscriptionConfig(sentiment_analysis=True)

    transcript = aai.Transcriber().transcribe(audio_file, config)

    for sentiment_result in transcript.sentiment_analysis:
        print(sentiment_result.text)
        print(sentiment_result.sentiment)  # POSITIVE, NEUTRAL, or NEGATIVE
        print(sentiment_result.confidence)
        print(f"Timestamp: {sentiment_result.start} - {sentiment_result.end}")


if __name__ == "__main__" : 

    model, tokenizer = initialize_models()
    file_path = "audio/data/speaker_3.wav"

    transcript = STT("transcript", "audio/data/speaker_2.wav")
    sentiment = get_sentiment(transcript, model, tokenizer)

    print(f"Transcript : {transcript}")
    print(f"Sentiment : {sentiment}")






