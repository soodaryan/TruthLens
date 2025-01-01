
import os
import logging
import numpy as np
from langdetect import detect
import speech_recognition as sr
from translate import Translator


class audioProcessor:
    formats = ['.webm', '.mp4', '.mpga', '.m4a', '.mp3', '.wav', '.mpeg']

    @staticmethod
    def is_valid_file(file_path):
        return os.path.isfile(file_path)

    @staticmethod
    def is_supported_format(file_path):
        return os.path.splitext(file_path)[1].lower() in audioProcessor.formats

    @staticmethod
    def reduce_noise(audio_data, noise_threshold=0.05):
        spectrum = np.fft.fft(audio_data)
        magnitude = np.abs(spectrum)
        phase = np.angle(spectrum)

        noise_mask = magnitude < noise_threshold * np.max(magnitude)
        noise_spectrum = np.mean(magnitude[noise_mask], axis=0)

        clean_magnitude = np.maximum(magnitude - noise_spectrum, 0)

        clean_spectrum = clean_magnitude * np.exp(1j * phase)
        clean_audio = np.fft.ifft(clean_spectrum).real.astype(np.int16)

        return clean_audio


class TranscriptProcessor:
    def __init__(self, translate_to_english=False):
        self.translate_to_english=translate_to_english
        self.translator = Translator(to_lang="en")

    def create_transcript_file(self, file_path, transcript, confidence_scores=None):
        output_file_path = f"{file_path}-transcript.txt"
        if os.path.exists(output_file_path):
            logging.info(f"Output file '{output_file_path}' already exists. Skipping.")
            return

        try:
            with open(output_file_path, 'w') as f:
                f.write(transcript)
                if confidence_scores:
                    for word, confidence in zip(transcript.split(), confidence_scores):
                        f.write(f"\n  - {word} ({confidence:.2f})")
        except Exception as e:
            logging.error(f"Error while creating transcript file: {e}")

    def process_transcript(self, transcript, file_path):
        if self.translate_to_english:
            
                translated_text = self.translator.translate(transcript)
                print(translated_text)
   
        return transcript


class SpeechToText:
    def __init__(self, audio_file):
        self.audio_file = audio_file

    def detect_and_route_language(self):
        try:
            recognizer = sr.Recognizer()
            with sr.AudioFile(self.audio_file) as source:
                audio_data = recognizer.record(source)

            transcript = recognizer.recognize_google(audio_data)
            detected_language = detect(transcript)
            logging.info(f"Detected language: {detected_language}")
            return detected_language, transcript

        except sr.UnknownValueError:
            logging.warning("Speech recognition could not understand audio.")
            return None, None
        except sr.RequestError as e:
            logging.error(f"Could not request results from Google Speech-to-Text service: {e}")
            return None, None
        except Exception as e:
            logging.error(f"An error occurred: {e}")
            return None, None


class AudioFileProcessor:
    def __init__(self, audio_file, translate_to_english=False):
        self.audio_file = audio_file
        self.translate_to_english = translate_to_english
        self.speech_to_text = SpeechToText(audio_file)
        self.transcript_processor = TranscriptProcessor(translate_to_english)

    def process(self):
        if not audioProcessor.is_valid_file(self.audio_file) or not audioProcessor.is_supported_format(self.audio_file):
            logging.error(f"Input file '{self.audio_file}' does not exist, is not a file, or has an unsupported format.")
            return

        detected_language, transcript = self.speech_to_text.detect_and_route_language()
        if transcript is None:
            return

        self.transcript_processor.create_transcript_file(self.audio_file, transcript)

        return self.transcript_processor.process_transcript(transcript, self.audio_file)


def main():
    audio_file = "TruthLens/audio/data/speaker_2.wav"
    processor = AudioFileProcessor(audio_file, translate_to_english=True)
    transcript = processor.process()
    print(transcript)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    main()