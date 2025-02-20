from flask import Flask
from config import Config
from extensions import db, migrate  # Import from extensions

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    # Import models after db is initialized to avoid circular import
    with app.app_context():
        from models import User  # Import models inside the function

    migrate.init_app(app, db)  # Initialize Flask-Migrate

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5555)
