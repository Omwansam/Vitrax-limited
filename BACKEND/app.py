from flask import Flask
from config import Config
from extensions import db, migrate, jwt  # Import from extensions
from flask_cors import CORS
from routes.users_route import users_bp
from routes.products_route import product_bp
from routes.order_route import order_bp
from routes.productImage_route import product_image_bp
from routes.category_route import category_bp
from routes.review_route import review_bp
from routes.promotion_route import promotion_bp

def create_app():
    app = Flask(__name__)
    CORS(app)  
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)  # Initialize Flask-JWT

    # Import models after db is initialized to avoid circular import
    with app.app_context():
        from models import User  # Import models inside the function

    migrate.init_app(app, db)  # Initialize Flask-Migrate

     #REGISTER BLUEPRINTS
    app.register_blueprint(users_bp,url_prefix = '/auth')  # Register users blueprint
    app.register_blueprint(product_bp,url_prefix = '/products') # Register products blueprint
    app.register_blueprint(order_bp,url_prefix = '/orders') # Register
    app.register_blueprint(product_image_bp,url_prefix = '/productimages') # Register
    app.register_blueprint(category_bp,url_prefix = '/categories') # Register categories blueprint
    app.register_blueprint(review_bp,url_prefix = '/reviews') # Register reviews blueprint
    app.register_blueprint(promotion_bp,url_prefix = '/promotions') # Register promotions blueprint

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5555)
