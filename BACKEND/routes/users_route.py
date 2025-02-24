from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db
from models import User

# Blueprint Configuration
users_bp = Blueprint('auth', __name__)

#USER LOGIN
@users_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Check if email and password are provided
    if not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    email = data['email']
    password = data['password']

    # Fetch the user from the database
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid email or password"}), 401
    
@users_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    # Validate input
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400
    
    # Check if the email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400
    
    # Create a new user
    user = User(username=data['username'], email=data['email'], password_hash=generate_password_hash(data['password']))
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


