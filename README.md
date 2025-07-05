# Image Captioning App 📸✨

Welcome to an **awesome** web app that creates cool captions for your uploaded images using AI magic! 🎉  
Powered by a snappy FastAPI backend with the lightweight `Salesforce/blip-image-captioning-base` model and a sleek React frontend styled with Tailwind CSS.  
Deployed on **Render** (backend) and **Vercel** (frontend) for a smooth, scalable experience! 🌐🚀

---

## 🌟 Features
- 📷 Upload any JPEG/PNG image and get a **one-sentence caption** describing it.
- ⚡ Lightweight backend with `Salesforce/blip-image-captioning-base` (~250MB) for fast performance.
- 🎨 Responsive, modern frontend built with React and Tailwind CSS.
- 🔗 Seamless frontend-backend communication with CORS support.
- ☁️ Hosted on Render (backend) and Vercel (frontend) for easy access.

---

## 🛠️ Tech Stack
### Backend
- **FastAPI** 🚀: High-performance Python framework for blazing-fast APIs.
- **Salesforce/blip-image-captioning-base** 🖼️: Lightweight AI model for generating image captions.
- **Pillow** 🖌️: Handles image uploads.
- **PyTorch** 🔥: Powers the AI.

### Frontend
- **React** ⚛️: Dynamic JavaScript library for a slick user interface.
- **Tailwind CSS** 🎨: Utility-first CSS framework for styling.

### Deployment
- **Render** ☁️: Hosts the FastAPI backend.
- **Vercel** 🌍: Serves the React frontend.

---

## 🧑‍💻 Installation (Local Development)

### ✅ Prerequisites
- 🐍 Python 3.11
- 📦 Node.js 16+
- 📂 Git

---

### ⚙️ Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Create and activate a virtual environment
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
