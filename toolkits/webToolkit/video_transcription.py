# import av
# import wave
# import numpy as np
# from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq
# import torchaudio
# import torch
# import os

# # Initialize Whisper model and processor
# processor = AutoProcessor.from_pretrained("openai/whisper-small")
# model = AutoModelForSpeechSeq2Seq.from_pretrained("openai/whisper-small")

# def extract_audio_with_av(video_path, output_audio_path="temp_audio.wav"):
#     """
#     Extract audio from a video file using PyAV and save it as a WAV file.
    
#     Args:
#         video_path (str): Path to the input video file.
#         output_audio_path (str): Path to save the extracted audio file.
#     """
#     container = av.open(video_path)
#     audio_stream = next(s for s in container.streams if s.type == "audio")
#     audio_frames = container.decode(audio_stream)
    
#     # Gather raw audio samples
#     samples = []
#     for frame in audio_frames:
#         samples.append(frame.to_ndarray())
    
#     # Combine all frames into a single array
#     audio_data = np.concatenate(samples, axis=0).astype(np.int16)
    
#     # Save as WAV file
#     with wave.open(output_audio_path, "wb") as wf:
#         wf.setnchannels(audio_stream.channels)
#         wf.setsampwidth(2)  # 2 bytes per sample (16-bit audio)
#         wf.setframerate(audio_stream.rate)
#         wf.writeframes(audio_data.tobytes())
#     return output_audio_path

# def transcribe_audio(audio_path):
#     """
#     Transcribe speech from an audio file using Whisper.
    
#     Args:
#         audio_path (str): Path to the audio file.
    
#     Returns:
#         str: Transcription of the audio.
#     """
#     # Load the audio file with explicit format
#     try:
#         audio, _ = torchaudio.load(audio_path, format="wav")
#     except Exception as e:
#         raise ValueError(f"Failed to load audio: {e}")
    
#     audio = audio.squeeze(0)  # Remove channel dimension if it exists
    
#     # Process the input
#     inputs = processor(audio, sampling_rate=16000, return_tensors="pt")
    
#     # Generate transcription
#     with torch.no_grad():
#         generated_ids = model.generate(inputs["input_features"])
#     transcription = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
#     return transcription

# def transcribe_video(video_path):
#     """
#     Extract and transcribe audio from a video file.
    
#     Args:
#         video_path (str): Path to the input video file.
    
#     Returns:
#         str: Transcription of the video.
#     """
#     try:
#         audio_path = extract_audio_with_av(video_path)
#         transcription = transcribe_audio(audio_path)
#         os.remove(audio_path)  # Clean up temporary audio file
#         return transcription
#     except Exception as e:
#         return f"Error processing video: {e}"

# # Example Usage
# video_file = r"C:\Users\itsta\OneDrive\Desktop\HEMANG\TruthLens\toolkits\webToolkit\aims.mp4"  # Replace with your video file
# transcription = transcribe_video(video_file)
# print("Transcription:", transcription)


