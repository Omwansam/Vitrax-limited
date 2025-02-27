from models import Promotion
from flask import Blueprint, request, jsonify
from extensions import db
from flask_jwt_extended import jwt_required

# Blueprint Configuration
promotion_bp = Blueprint('promotions', __name__)

# Create a new promotion
@promotion_bp.route('', methods=['POST'])
@jwt_required()
def create_promotion():
    data = request.get_json()
    new_promotion = Promotion(
        promotion_code=data.get('promotion_code'),
        discount_type=data.get('discount_type'),
        discount_value=data.get('discount_value'),
        start_date=data.get('start_date'),
        end_date=data.get('end_date')
    )
    db.session.add(new_promotion)
    db.session.commit()
    return jsonify({'message': 'Promotion created successfully', 'promotion_id': new_promotion.promotion_id}), 201

# Get all promotions
@promotion_bp.route('', methods=['GET'])
def get_promotions():
    promotions = Promotion.query.all()
    return jsonify([{
        'promotion_id': promotion.promotion_id,
        'promotion_code': promotion.promotion_code,
        'discount_type': promotion.discount_type,
        'discount_value': promotion.discount_value,
        'start_date': promotion.start_date,
        'end_date': promotion.end_date
    } for promotion in promotions]), 200

# Get a specific promotion by ID
@promotion_bp.route('/<int:promotion_id>', methods=['GET'])
def get_promotion(promotion_id):
    promotion = Promotion.query.get_or_404(promotion_id)
    return jsonify({
        'promotion_id': promotion.promotion_id,
        'promotion_code': promotion.promotion_code,
        'discount_type': promotion.discount_type,
        'discount_value': promotion.discount_value,
        'start_date': promotion.start_date,
        'end_date': promotion.end_date
    }), 200

# Delete a promotion
@promotion_bp.route('/<int:promotion_id>', methods=['DELETE'])
@jwt_required()
def delete_promotion(promotion_id):
    promotion = Promotion.query.get_or_404(promotion_id)
    db.session.delete(promotion)
    db.session.commit()
    return jsonify({'message': 'Promotion deleted successfully'}), 200