import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import CaptionDisplay from "./components/CaptionDisplay";

function App() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/generate-caption", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setCaption(data.caption);
    } catch (err) {
      console.error(err);
      alert("Failed to get caption.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">🖼️ AI Caption Generator</h1>
      <UploadForm
        onFileChange={setFile}
        onUpload={handleUpload}
        loading={loading}
        disabled={!file || loading}
      />
      <CaptionDisplay caption={caption} />
    </div>
  );
}

export default App;
