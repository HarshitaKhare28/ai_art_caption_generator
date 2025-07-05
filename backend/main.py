from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from PIL import Image
import uvicorn
import os
import time
import logging
import torch

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://ai-art-caption-generator.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
try:
    logger.info("Loading captioning model...")
    captioner = pipeline(
        "image-to-text",
        model="Salesforce/blip-image-captioning-base",
        device=0 if torch.cuda.is_available() else -1,
        torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
    )
    logger.info("Captioning model loaded successfully.")
except Exception as e:
    logger.error(f"Failed to load model: {str(e)}")
    raise

@app.get("/")
async def root():
    return {"message": "Backend is running!"}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/generate-caption")
async def generate_caption(file: UploadFile = File(...)):
    try:
        start_time = time.time()
        logger.info(f"Received file: {file.filename}, size: {file.size}")
        
        # Validate file type
        if not file.content_type.startswith("image/"):
            logger.error("Invalid file type: Not an image")
            return {"caption": "Invalid file type: Please upload an image"}
        
        # Process image
        image = Image.open(file.file).convert("RGB").resize((384, 384))
        logger.info(f"Image processed in {time.time() - start_time:.2f} seconds")
        
        # Generate caption
        result = captioner(image, max_new_tokens=50)
        caption = result[0]["generated_text"] if result else "No caption generated"
        logger.info(f"Caption generated in {time.time() - start_time:.2f} seconds: {caption}")
        
        # Clear memory
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
        
        return {"caption": caption}
    except Exception as e:
        logger.error(f"Error in generate_caption: {str(e)}", exc_info=True)
        return {"caption": f"Failed to generate caption: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        log_level="info",
        proxy_headers=True,
        timeout_keep_alive=300,
        timeout=600,
        workers=1
    )