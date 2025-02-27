from flask import Blueprint, request, jsonify
from models import ProductImage
from extensions import db
from flask_jwt_extended import jwt_required

# Blueprint Configuration
product_image_bp = Blueprint('product_images', __name__)

# Delete a product image
@product_image_bp.route('/<int:image_id>', methods=['DELETE'])
@jwt_required()
def delete_product_image(image_id):
    image = ProductImage.query.get_or_404(image_id)
    db.session.delete(image)
    db.session.commit()
    return jsonify({'message': 'Product image deleted successfully'}), 200
