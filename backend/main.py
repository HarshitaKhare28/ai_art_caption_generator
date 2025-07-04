from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-art-caption-generator.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")

@app.get("/")
async def root():
    return {"message": "Backend is running!"}

@app.post("/generate-caption")
async def generate_caption(file: UploadFile = File(...)):
    try:
        image = Image.open(file.file).convert('RGB')
        
        inputs = processor(images=image, text="", return_tensors="pt")
        
        out = model.generate(
            **inputs,
            num_beams=5,
            max_length=30,
            min_length=5,
            repetition_penalty=1.2
        )
        caption = processor.decode(out[0], skip_special_tokens=True)
        
        return {"caption": caption}
    except Exception as e:
        print("Error:", e)
        return {"caption": "Failed to generate caption."}
