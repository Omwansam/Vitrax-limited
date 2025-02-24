from flask_jwt_extended import JWTManager
from datetime import timedelta
import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY','12627e006079cc86b16d75f3')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL',
                                        'postgresql://vitrax_user:9NK8FoI14qrgn71Nl5bUFE8cDkkSoliI@dpg-cuu8rmd6l47c73adeddg-a.oregon-postgres.render.com/vitrax_9svf')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY','3e7262fb18190b962c35a39f')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)