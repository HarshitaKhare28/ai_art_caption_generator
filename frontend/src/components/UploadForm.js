import React, { useState } from 'react';
import CaptionDisplay from './CaptionDisplay'; // import the component

function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/generate-caption', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setCaption(data.caption);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Generate Caption
        </button>
      </form>
      {loading && <p className="mt-2">Loading...</p>}
      <CaptionDisplay caption={caption} />
    </div>
  );
}

export default UploadForm;
