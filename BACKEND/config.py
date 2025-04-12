from flask_jwt_extended import JWTManager
from datetime import timedelta
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY','12627e006079cc86b16d75f3')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL',
                                        'postgresql://vitrax_user:9NK8FoI14qrgn71Nl5bUFE8cDkkSoliI@dpg-cuu8rmd6l47c73adeddg-a.oregon-postgres.render.com/vitrax_9svf')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY','3e7262fb18190b962c35a39f')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static/uploads')  # Local storage
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}



    # Ensure upload folder exists
    os.makedirs(UPLOAD_FOLDER, exist_ok=True) 