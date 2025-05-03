import os
from dotenv import load_dotenv  # Load dotenv to read .env file

# Load environment variables from .env file
load_dotenv()

class Config:
    DEBUG = False
    SECRET_KEY = os.getenv("SECRET_KEY", "fallbacksecret")  # Fallback if .env is missing
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI", "sqlite:///fallback.db")  
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
