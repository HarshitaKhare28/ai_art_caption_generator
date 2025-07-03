// src/components/UploadForm.js
import React from "react";

function UploadForm({ onFileChange, onUpload, loading, disabled }) {
  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={(e) => onFileChange(e.target.files[0])}
      />
      <button
        onClick={onUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={disabled}
      >
        {loading ? "Generating..." : "Generate Caption"}
      </button>
    </div>
  );
}

export default UploadForm;
