from flask import Flask
from config import Config
from extensions import db, migrate, jwt  # Import from extensions
from routes.users_route import users_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)  # Initialize Flask-JWT

    # Import models after db is initialized to avoid circular import
    with app.app_context():
        from models import User  # Import models inside the function

    migrate.init_app(app, db)  # Initialize Flask-Migrate

     #REGISTER BLUEPRINTS
    app.register_blueprint(users_bp,url_prefix = '/auth')  # Register users blueprint

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5555)
