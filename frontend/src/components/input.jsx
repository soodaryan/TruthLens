import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
const InputForm = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [relatedLinks, setRelatedLinks] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [audioUrls, setAudioUrls] = useState([]);
  const [linkInput, setLinkInput] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...files]);
    setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
  };

  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    const newVideoUrls = files.map((file) => URL.createObjectURL(file));
    setVideos((prevVideos) => [...prevVideos, ...files]);
    setVideoUrls((prevUrls) => [...prevUrls, ...newVideoUrls]);
  };

  const handleAudioChange = (event) => {
    const files = Array.from(event.target.files);
    const newAudioUrls = files.map((file) => URL.createObjectURL(file));
    setAudios((prevAudios) => [...prevAudios, ...files]);
    setAudioUrls((prevUrls) => [...prevUrls, ...newAudioUrls]);
  };

  const handleLinkAdd = () => {
    if (linkInput.trim()) {
      setRelatedLinks((prevLinks) => [...prevLinks, linkInput.trim()]);
      setLinkInput("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    // Append all media and text data to the FormData object
    images.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });
    videos.forEach((video, index) => {
      formData.append(`video_${index}`, video);
    });
    audios.forEach((audio, index) => {
      formData.append(`audio_${index}`, audio);
    });
    formData.append("textInput", textInput);
    formData.append("relatedLinks", JSON.stringify(relatedLinks));

    try {
      // Send the data to the backend
      const response = await fetch("http://127.0.0.1:5000/upload-media", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Upload successful:", result.message);
      } else {
        console.error("Failed to upload media");
      }

      navigate("/trend-and-report");
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };

  return (
    <>
    <Sidebar />
    <div className="bg-gray-900 text-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-6">Input Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Text Input */}
          <div>
            <label htmlFor="textInput" className="block text-sm font-medium mb-2">
              Enter Text
            </label>
            <textarea
              id="textInput"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="block w-full border border-gray-600 bg-gray-700 rounded-lg p-2 text-gray-100"
              rows="4"
              placeholder="Enter additional text details here..."
              ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="imageUpload" className="block text-sm font-medium mb-2">
              Upload Images
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full border border-gray-600 bg-gray-700 rounded-lg p-2 text-gray-100"
              />
            <div className="grid grid-cols-5 gap-4 mt-4">
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Uploaded ${index + 1}`} className="rounded-lg h-32 object-cover" />
              ))}
            </div>
          </div>

          {/* Video Upload */}
          <div>
            <label htmlFor="videoUpload" className="block text-sm font-medium mb-2">
              Upload Videos
            </label>
            <input
              type="file"
              id="videoUpload"
              accept="video/*"
              multiple
              onChange={handleVideoChange}
              className="block w-full border border-gray-600 bg-gray-700 rounded-lg p-2 text-gray-100"
              />
            <div className="grid grid-cols-1 gap-4 mt-4">
              {videoUrls.map((url, index) => (
                <video key={index} controls className="rounded-lg w-full h-32 object-cover" src={url} />
              ))}
            </div>
          </div>

          {/* Audio Upload */}
          <div>
            <label htmlFor="audioUpload" className="block text-sm font-medium mb-2">
              Upload Audios
            </label>
            <input
              type="file"
              id="audioUpload"
              accept="audio/*"
              multiple
              onChange={handleAudioChange}
              className="block w-full border border-gray-600 bg-gray-700 rounded-lg p-2 text-gray-100"
              />
            <div className="mt-4 space-y-2">
              {audioUrls.map((url, index) => (
                <audio key={index} controls className="w-full" src={url} />
              ))}
            </div>
          </div>

          {/* Related Links */}
          <div>
            <label htmlFor="relatedLinks" className="block text-sm font-medium mb-2">
              Add Related Links
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                id="relatedLinks"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                className="block w-full border border-gray-600 bg-gray-700 rounded-lg p-2 text-gray-100"
                placeholder="Enter a URL"
                />
              <button
                type="button"
                onClick={handleLinkAdd}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition"
                >
                Add
              </button>
            </div>
            <ul className="mt-4 list-disc list-inside space-y-1">
              {relatedLinks.map((link, index) => (
                <li key={index} className="text-blue-400 hover:underline">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white font-medium py-2 rounded-lg hover:bg-primary-800 transition"
              >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
              </>
  );
};

export default InputForm;
