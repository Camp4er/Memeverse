import { useState } from "react";
import Image from "next/image";
import { UploadedMeme } from "../types/upload";
import { v4 as uuidv4 } from "uuid";

const UploadPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadedMemes, setUploadedMemes] = useState<UploadedMeme[]>([]);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle upload to ImgBB API
  const handleUpload = async () => {
    if (!image) return alert("Please select an image!");

    setUploading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        const newMeme: UploadedMeme = {
          id: uuidv4(),
          imageUrl: data.data.url,
          caption,
          createdAt: Date.now(),
        };

        // Save to local storage
        const updatedMemes = [...uploadedMemes, newMeme];
        setUploadedMemes(updatedMemes);
        localStorage.setItem("uploadedMemes", JSON.stringify(updatedMemes));

        // Reset state
        setImage(null);
        setPreviewUrl(null);
        setCaption("");
      } else {
        alert("Upload failed. Try again!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading meme!");
    }

    setUploading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold text-center">Upload Your Meme</h1>

      {/* File Input */}
      <input type="file" accept="image/*" onChange={handleImageChange} className="mt-4" />

      {/* Preview Section */}
      {previewUrl && (
        <div className="relative w-full h-80 mt-4">
          <Image src={previewUrl} alt="Meme Preview" layout="fill" objectFit="contain" className="rounded-lg" />
        </div>
      )}

      {/* Caption Input */}
      <textarea
        className="w-full p-2 border rounded mt-4"
        placeholder="Add a funny caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      {/* Upload Button */}
      <button
        className={`w-full py-2 mt-4 text-white rounded-lg ${uploading ? "bg-gray-400" : "bg-green-500"}`}
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Meme"}
      </button>
    </div>
  );
};

export default UploadPage;
