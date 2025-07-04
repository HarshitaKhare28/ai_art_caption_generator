import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      const response = await fetch("https://ai-art-caption-generator.onrender.com/generate-caption", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      setCaption(data.caption);
    } catch (err) {
      console.error(err);
      setCaption("Failed to generate caption.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-700">
      <Navbar />
      <div className="flex-grow">
        <UploadForm
          onFileChange={(f) => setFile(f)}
          onUpload={handleUpload}
          loading={loading}
          disabled={!file || loading}
          fileName={file ? file.name : null}
          caption={caption}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
