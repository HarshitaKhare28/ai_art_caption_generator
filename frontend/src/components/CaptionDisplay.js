
import React from "react";

function CaptionDisplay({ caption }) {
  if (!caption) return null;

  return (
    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
      <p className="text-sm font-medium text-gray-500 mb-1">Generated Caption:</p>
      <p className="text-gray-800">{caption}</p>
    </div>
  );
}

export default CaptionDisplay;