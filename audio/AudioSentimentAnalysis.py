from SpeechToText.AudioProcessor import STT
from text.SentimentAnalysis import get_sentiment, initialize_models


if __name__ == "__main__" : 

    model, tokenizer = initialize_models()
    file_path = "audio/data/speaker_3.wav"

    transcript = STT("transcript", "audio/data/speaker_2.wav")
    sentiment = get_sentiment(transcript, model, tokenizer)

    print(f"Transcript : {transcript}")
    print(f"Sentiment : {sentiment}")


