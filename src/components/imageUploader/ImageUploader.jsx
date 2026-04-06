"use client";

import { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { deleteImageFromCloudinary } from "../../services/projects.api";

const ImageUploader = ({ images, setImages }) => {
  const [preview, setPreview] = useState([]);

  useEffect(() => {
  if (!images?.length) {
    setPreview([]);
    return;
  }

  const urls = images.map((img) => {
    if (typeof img === "string") {
      return img; // already a URL from backend
    }
    return URL.createObjectURL(img); // file uploaded from input
  });

  setPreview(urls);

  return () => {
    urls.forEach((url) => {
      if (url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });
  };
}, [images]);

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    setImages((prev) => [...prev, ...fileArray]);
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = async(index) => {
    const newImages = [...images];
    const img = newImages[index];
    newImages.splice(index, 1);

    try {
      if (typeof img === "string") {
        await deleteImageFromCloudinary(img);
      }
    } catch (err) {
      console.error("Failed to delete image:", err);
    } finally {
      setImages(newImages);
    } 
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-teal-400 border-dashed p-6 text-center rounded-lg cursor-pointer"
      >
        <p>Drag & Drop Images</p>

        <label className="text-teal-400 cursor-pointer">Browse
          <input type="file" multiple hidden onChange={handleChange} />
        </label>
      </div>

      {preview.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {preview.map((src, index) => (
            <div
              key={index}
              className="relative group border rounded-lg overflow-hidden"
            >
              <img
                src={src}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-white text-balck rounded-full"
              >
                <GiCancel size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ImageUploader;
