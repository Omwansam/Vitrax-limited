from flask_jwt_extended import JWTManager
import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY','12627e006079cc86b16d75f3')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL',
                                        'postgresql://vitrax_user:xEmaw5hgYJz1F5mQ4zVi337E0RWObd8T@dpg-curkbbhopnds73f40ue0-a.oregon-postgres.render.com/vitrax')
    SQLALCHEMY_TRACK_MODIFICATIONS = False