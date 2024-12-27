import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InputForm = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can send `images` and `videos` to a server if needed
    navigate("/trend-analysis");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white border rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-6">Input Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium mb-2"
            >
              Upload Images
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full border rounded-lg p-2"
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="rounded-lg h-32 object-cover"
                />
              ))}
            </div>
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
              className="block w-full border rounded-lg p-2"
            />
            <div className="grid grid-cols-1 gap-4 mt-4">
              {videoUrls.map((url, index) => (
                <video
                  key={index}
                  controls
                  className="rounded-lg w-full h-32 object-cover"
                  src={url}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-black font-medium py-2 rounded-lg hover:bg-primary-800 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;