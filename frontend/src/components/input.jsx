import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
const InputForm = () => {
  const [videos, setVideos] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [relatedLinks, setRelatedLinks] = useState([]);
  const [videoLinks, setVideoLinks] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [videoLinkInput, setVideoLinkInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    const newVideoUrls = files.map((file) => URL.createObjectURL(file));
    setVideos((prevVideos) => [...prevVideos, ...files]);
    setVideoUrls((prevUrls) => [...prevUrls, ...newVideoUrls]);
  };

  const handleLinkAdd = () => {
    if (linkInput.trim()) {
      setRelatedLinks((prevLinks) => [...prevLinks, linkInput.trim()]);
      setLinkInput("");
    }
  };
  const handleVideoLinkAdd = () => {
    if (videoLinkInput.trim()) {
      setVideoLinks((prevLinks) => [...prevLinks, videoLinkInput.trim()]);
      setVideoLinkInput("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    console.log("Videos:", videos);
    console.log("Text Input:", textInput);
    console.log("Related Links:", relatedLinks);
    console.log("Video Links:", videoLinks);
    // Create a FormData object
    const formData = new FormData();

    // Append videos (as files)
    videos.forEach((video, index) => {
      formData.append(`video_${index}`, video);
    });

    // Append text input
    formData.append("textInput", textInput);

    // Append related links (as JSON string)
    formData.append("relatedLinks", JSON.stringify(relatedLinks));

    // Append video links (as JSON string)
    formData.append("videoLinks", JSON.stringify(videoLinks));

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // Send the FormData to the backend
    try {
      const response = await fetch("http://127.0.0.1:5000/upload-media", {
        method: "POST",
        body: formData, // Send the FormData object
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Upload successful:", result.message);

        // Navigate to another page after success
        setTimeout(() => {
          navigate("/trend-and-report");
        }, 2000);
      } else {
        console.error("Failed to upload media");
      }
    } catch (error) {
      console.error("Error uploading media:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Sidebar />
      <div className="bg-gray-100 text-gray-900 flex justify-center">
        <div className="ml-80 mr-20 mt-10 bg-white border border-gray-300 rounded-lg p-6 w-full shadow-lg">
          <h2 className="text-black font-semibold mb-6">Input Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Text Input */}
            <div>
              <label
                htmlFor="textInput"
                className="block text-sm font-medium mb-2"
              >
                Enter News to be Verified
              </label>
              <textarea
                id="textInput"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="block w-full border border-gray-300 bg-white rounded-lg p-2 text-gray-900"
                rows="4"
                placeholder="Enter additional text details here..."
              ></textarea>
            </div>

            {/* Video Upload */}
            <div>
              <label
                htmlFor="videoUpload"
                className="block text-sm font-medium mb-2"
              >
                Upload Videos
              </label>
              <input
                type="file"
                id="videoUpload"
                accept="video/*"
                multiple
                onChange={handleVideoChange}
                className="block w-full border border-gray-300 bg-white rounded-lg p-2 text-gray-900"
              />
              <div className="grid grid-cols-1 gap-4 mt-4">
                {videoUrls.map((url, index) => (
                  <video
                    key={index}
                    controls
                    className="rounded-lg h-32 object-cover border border-gray-300"
                    src={url}
                  />
                ))}
              </div>
            </div>
            {/*Video Links */}
            <div>
              <label
                htmlFor="videoLinks"
                className="block text-sm font-medium mb-2"
              >
                Add Video Links
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  id="videoLinks"
                  value={videoLinkInput}
                  onChange={(e) => setVideoLinkInput(e.target.value)}
                  className="block w-full border border-gray-300 bg-white rounded-lg p-2 text-gray-900"
                  placeholder="Enter a URL"
                />
                <button
                  type="button"
                  onClick={handleVideoLinkAdd}
                  className="bg-primary-500 text-black px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Add
                </button>
              </div>
              <ul className="mt-4 list-disc list-inside space-y-1">
                {videoLinks.map((link, index) => (
                  <li key={index} className="text-blue-500 hover:underline">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Links */}
            <div>
              <label
                htmlFor="relatedLinks"
                className="block text-sm font-medium mb-2"
              >
                Add Blog Websites Or News Links
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  id="relatedLinks"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  className="block w-full border border-gray-300 bg-white rounded-lg p-2 text-gray-900"
                  placeholder="Enter a URL"
                />
                <button
                  type="button"
                  onClick={handleLinkAdd}
                  className="bg-primary-500 text-black px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Add
                </button>
              </div>
              <ul className="mt-4 list-disc list-inside space-y-1">
                {relatedLinks.map((link, index) => (
                  <li key={index} className="text-blue-500 hover:underline">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit Button */}
            <div>
              {isLoading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm z-50">
                  <div className="text-center">
                    <div className="relative w-16 h-16">
                      {/* Gradient spinning rings */}
                      <div className="absolute inset-0 w-full h-full rounded-full border-4 border-transparent border-t-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin"></div>
                      <div className="absolute inset-1 w-full h-full rounded-full border-4 border-transparent border-t-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 animate-spin-slow"></div>
                      <div className="absolute inset-2 w-full h-full rounded-full border-4 border-transparent border-t-gradient-to-r from-yellow-500 via-green-500 to-blue-500 animate-spin-slower"></div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-lg font-medium text-gray-600 animate-pulse">
                        Uploading
                      </p>
                      <div className="flex justify-center gap-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-primary-500 text-black font-medium py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputForm;
