from flask import Blueprint, request, jsonify
from models import Category
from extensions import db
from flask_jwt_extended import jwt_required

# Blueprint Configuration
category_bp = Blueprint('categories', __name__)
# Create a new category
@category_bp.route('', methods=['POST'])
@jwt_required()
def create_category():
    data = request.get_json()
    new_category = Category(
        category_name=data.get('category_name'),
        category_description=data.get('category_description')
    )
    db.session.add(new_category)
    db.session.commit()
    return jsonify({'message': 'Category created successfully', 'category_id': new_category.category_id}), 201

# Get all categories
@category_bp.route('', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{
        'category_id': category.category_id,
        'category_name': category.category_name,
        'category_description': category.category_description
    } for category in categories]), 200

# Get a specific category by ID
@category_bp.route('/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = Category.query.get_or_404(category_id)
    return jsonify({
        'category_id': category.category_id,
        'category_name': category.category_name,
        'category_description': category.category_description
    }), 200

# Delete a category
@category_bp.route('/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    category = Category.query.get_or_404(category_id)
    db.session.delete(category)
    db.session.commit()
    return jsonify({'message': 'Category deleted successfully'}), 200
