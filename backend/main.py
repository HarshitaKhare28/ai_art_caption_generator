from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from PIL import Image
import uvicorn
import os
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://ai-art-caption-generator.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading captioning model...")
captioner = pipeline("image-to-text", model="nlpconnect/vit-gpt2-image-captioning")
print("Captioning model loaded.")

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
        print(f"Received file: {file.filename}, size: {file.size}")
        image = Image.open(file.file).convert('RGB')
        print(f"Image opened successfully in {time.time() - start_time:.2f} seconds")
        
        # Generate caption using the pipeline
        result = captioner(image)
        caption = result[0]['generated_text'] if result else "Failed to generate caption."
        
        return {"caption": caption}
    except Exception as e:
        print(f"Error in generate_caption: {str(e)}")
        return {"caption": f"Failed to generate caption: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        log_level="debug",
        proxy_headers=True,
        timeout_keep_alive=300,
        timeout=300
    )