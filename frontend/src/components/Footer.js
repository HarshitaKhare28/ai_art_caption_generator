import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-700 text-gray-300 py-6 mt-8">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        
        <div>
          <h3 className="text-white font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-400">
            Empowering creativity by turning your images into unique, AI-generated captions quickly and easily.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Get in Touch</h3>
          <p>Email: <a href="mailto:support@example.com" className="hover:text-white">support@example.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a></p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Features</h3>
          <ul className="space-y-1">
            <li>AI-powered caption generation</li>
            <li>Drag & drop image upload</li>
            <li>Instant results</li>
            <li>Clean, responsive UI</li>
          </ul>
        </div>
        
      </div>
      
      <div className="mt-6 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} AI Caption Generator. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
