// src/components/CaptionDisplay.js
import React from "react";

function CaptionDisplay({ caption }) {
  if (!caption) return null;

  return (
    <div className="mt-4 p-2 bg-white rounded shadow">
      <p className="font-medium">Caption:</p>
      <p>{caption}</p>
    </div>
  );
}

export default CaptionDisplay;
