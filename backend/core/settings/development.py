from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173", # Vite default port
    "http://127.0.0.1:5173",
]
