import os
import logging
import numpy as np
from langdetect import detect
import speech_recognition as sr
from googletrans import Translator

formats = ['.webm', '.mp4', '.mpga', '.m4a', '.mp3', '.wav', '.mpeg']

def is_valid_file(file_path):
    return os.path.isfile(file_path)


def is_supported_format(file_path):
    return os.path.splitext(file_path)[1].lower() in formats


def create_transcript_file(file_path, transcript, confidence_scores=None):
    # base_filename, _ = os.path.splitext(os.path.basename(file_path))
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


def detect_and_route_language(file_path):
    try:
        recognizer = sr.Recognizer()
        with sr.AudioFile(file_path) as source:
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


def process_file(file_path, translate_to_english=False):
    if not is_valid_file(file_path) or not is_supported_format(file_path):
        logging.error(f"Input file '{file_path}' does not exist, is not a file, or has an unsupported format.")
        return

    detected_language, transcript = detect_and_route_language(file_path)
    if transcript is None:
        return

    create_transcript_file(file_path, transcript)

    if translate_to_english:
        translator = Translator()
        try:
            translated_text = translator.translate(transcript, dest='en').text
            with open(f"{file_path}-transcript_en.txt", 'w') as f:
                f.write(f"{translated_text}\n")  
        except Exception as e:
            logging.error(f"Translation failed: {e}")


def process_directory(directory_path, recursive, translate_to_english=False):
    if not os.path.isdir(directory_path):
        logging.error(f"Directory '{directory_path}' does not exist or is not a directory.")
        return

    translator = Translator() if translate_to_english else None  

    for root, _, files in os.walk(directory_path if recursive else [directory_path]):
        for file in files:
            file_path = os.path.join(root, file)
            if is_supported_format(file_path):
                detected_language, transcript = detect_and_route_language(file_path)
                if transcript is None:
                    continue

                create_transcript_file(file_path, transcript)

                if translate_to_english and translator:
                    try:
                        translated_text = translator.translate(transcript, dest='en').text
                        with open(f"{file_path}-transcript_en.txt", 'w') as f:
                            f.write(f"{translated_text}\n") 
                    except Exception as e:
                        logging.error(f"Translation failed: {e}")

def get_transcript(file_path, translate_to_english=False):
    if not is_valid_file(file_path) or not is_supported_format(file_path):
        logging.error(f"Input file '{file_path}' does not exist, is not a file, or has an unsupported format.")
        return

    detected_language, transcript = detect_and_route_language(file_path)
    if transcript is None:
        return

    if translate_to_english:
        translator = Translator()
        try:
            translated_text = translator.translate(transcript, dest='en').text
            with open(f"{file_path}-transcript_en.txt", 'w') as f:
                f.write(f"{translated_text}\n")  
        except Exception as e:
            logging.error(f"Translation failed: {e}")

    return transcript

def STT(inputType, path):
    translate = False
    if inputType == "f" : 
        process_file(path, translate)
        return 1

    elif inputType == "d" : 
        recursive = True
        process_directory(path, recursive, translate) 
        return 1

    else : 
        return get_transcript(path, translate)
    logging.info("Processing completed.")



def main(): 
    transcript = STT("transcript", "audio/data/speaker_2.wav")
    print(transcript)

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    main()
