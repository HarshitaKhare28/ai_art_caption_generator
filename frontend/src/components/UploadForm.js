import React, { useState } from 'react';
import CaptionDisplay from './CaptionDisplay';

function UploadForm({ onFileChange, onUpload, loading, disabled, fileName, caption }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">AI Caption Generator</h1>
          <p className="text-gray-200 text-sm">Transform your images into captivating captions</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6">
          <form onSubmit={(e) => { e.preventDefault(); onUpload(); }} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose an image
              </label>
              <div
                className={`flex items-center justify-center w-full h-48 rounded-xl border-2 border-dashed ${
                  isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                } transition-all hover:border-indigo-400`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                  <svg className={`w-10 h-10 mb-2 ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className={`text-sm ${isDragging ? 'text-indigo-500 font-medium' : 'text-gray-500'}`}>
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF (MAX. 5MB)</p>
                  {fileName && (
                    <p className="mt-2 text-sm font-medium text-gray-700">
                      Selected: <span className="text-indigo-600">{fileName}</span>
                    </p>
                  )}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={disabled}
                className={`w-full py-3 px-6 rounded-full text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${
                  disabled ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 inline text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  'Generate Caption'
                )}
              </button>
            </div>
          </form>
          <CaptionDisplay caption={caption} />
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Powered by advanced AI technology. Results may vary based on image quality and content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
