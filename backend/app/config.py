import os
from dotenv import load_dotenv


load_dotenv()


class Config:
    
    APPNAME = "Research Paper Summarizer"
    PORT = int(os.getenv("PORT", 8000))

    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")



os.environ["GOOGLE_API_KEY"] = Config.GOOGLE_API_KEY or ""
os.environ["GROQ_API_KEY"] = Config.GROQ_API_KEY or ""
os.environ["HUGGINGFACE_API_KEY"] = Config.HUGGINGFACE_API_KEY or ""