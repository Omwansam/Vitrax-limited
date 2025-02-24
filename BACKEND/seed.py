from app import create_app
from models import User
from werkzeug.security import generate_password_hash
from extensions import db

app = create_app()

with app.app_context():
    # Clear existing data
    db.drop_all()

    # Create a new user
    users = [User(username='omwansa', email='omwansa@example.com', password_hash=generate_password_hash('omwansa123'))]
    db.session.add_all(users)
    db.session.commit()

    print("User created successfully")
