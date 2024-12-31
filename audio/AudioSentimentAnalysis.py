import os
import assemblyai as aai
#from TruthLens.audio.SpeechToText import AudioProcessor
#from TruthLens.text import sentiment_analyzer
from audio.SpeechToText.AudioProcessor import audioProcessor, TranscriptProcessor, SpeechToText, AudioFileProcessor
from text import SentimentAnalyzer
from dotenv import load_dotenv
load_dotenv()




class SentimentAnalysis:
    def __init__(self, audio_file="realnews.mp4", translate_to_english=False):

        self.audio_file = audio_file
        self.translate_to_english = translate_to_english
        self.audio_processor = AudioFileProcessor(self.audio_file, self.translate_to_english)
        self.transcript_processor = TranscriptProcessor(translate_to_english)
        self.sentiment_analyzer = SentimentAnalyzer()

    def get_sentiment_from_assemblyai(self):
        """Returns the sentiment of input news audio/video file using AssemblyAI."""
        try:
            aai.settings.api_key = os.environ["ASSEMBLYAI_API_KEY"]

            config = aai.TranscriptionConfig(sentiment_analysis=True)
            transcript = aai.Transcriber().transcribe(self.audio_file, config)

            sentiment_results = []
            for sentiment_result in transcript.sentiment_analysis:
                sentiment_results.append({
                    "text": sentiment_result.text,
                    "sentiment": sentiment_result.sentiment,  # POSITIVE, NEUTRAL, or NEGATIVE
                    "confidence": sentiment_result.confidence,
                    "timestamp": f"{sentiment_result.start} - {sentiment_result.end}"
                })
            return sentiment_results
        except Exception as e:
            print(f"Error occurred while fetching sentiment from AssemblyAI: {e}")
            return None

    def process_transcript(self):
        """Process the audio file and return the transcript."""
        return self.audio_processor.process()

    def analyze_sentiment(self, transcript):
        """Analyze sentiment using a custom sentiment analyzer."""
        return self.sentiment_analyzer.analyze_sentiment(transcript)

if __name__ == "__main__":
    sentiment_analysis = SentimentAnalysis(audio_file=r"TruthLens\audio\data\speaker_2.wav", translate_to_english=True)

    try:
        # Fetch sentiment analysis from AssemblyAI
        sentiment_results = sentiment_analysis.get_sentiment_from_assemblyai()
        if sentiment_results:
            print(f"Sentiment Analysis from AssemblyAI: {sentiment_results}")
        else:
            print("No sentiment analysis available from AssemblyAI.")
    except Exception as e:
        print(f"Error occurred while fetching sentiment: {e}")
        sentiment_results = None

    try:
        # Process transcript and analyze sentiment
        transcript = sentiment_analysis.process_transcript()
        sentiment = sentiment_analysis.analyze_sentiment(transcript)

        print(f"Transcript: {transcript}")
        print(f"Sentiment: {sentiment}")
    except Exception as e:
        print(f"Error occurred while processing the transcript or analyzing sentiment: {e}")
