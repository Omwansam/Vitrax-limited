from flask import Blueprint, request, jsonify
from models import Review
from extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity

# Blueprint Configuration
review_bp = Blueprint('reviews', __name__)

# Create a new review
@review_bp.route('', methods=['POST'])
@jwt_required()
def create_review():
    data = request.get_json()
    user_id = get_jwt_identity()
    new_review = Review(
        rating=data.get('rating'),
        review_text=data.get('review_text'),
        user_id=user_id,
        product_id=data.get('product_id')
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'Review added successfully', 'review_id': new_review.review_id}), 201

# Get all reviews
@review_bp.route('', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([{
        'review_id': review.review_id,
        'rating': review.rating,
        'review_text': review.review_text,
        'user_id': review.user_id,
        'product_id': review.product_id,
        'created_at': review.created_at
    } for review in reviews]), 200

# Get a specific review by ID
@review_bp.route('/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.query.get_or_404(review_id)
    return jsonify({
        'review_id': review.review_id,
        'rating': review.rating,
        'review_text': review.review_text,
        'user_id': review.user_id,
        'product_id': review.product_id,
        'created_at': review.created_at
    }), 200

# Delete a review
@review_bp.route('/<int:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    review = Review.query.get_or_404(review_id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted successfully'}), 200
