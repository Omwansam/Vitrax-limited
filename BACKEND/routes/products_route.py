from flask import Blueprint, request, jsonify
from models import Product, ProductImage
from flask_jwt_extended import jwt_required

from extensions import db

# Blueprint Configuration
product_bp = Blueprint('products', __name__)

# Create a new product with images
@product_bp.route('', methods=['POST'])
@jwt_required()
def create_product():
    data = request.get_json()
    images = data.get('images', [])
    
    new_product = Product(
        product_name=data.get('product_name'),
        product_description=data.get('product_description'),
        product_price=data.get('product_price'),
        stock_quantity=data.get('stock_quantity'),
        category_id=data.get('category_id')
    )
    db.session.add(new_product)
    db.session.commit()
    
    # Add product images if provided
    for img in images:
        new_image = ProductImage(
            image_url=img.get('image_url'),
            is_primary=img.get('is_primary', False),
            product_id=new_product.product_id
        )
        db.session.add(new_image)
    db.session.commit()
    
    return jsonify({'message': 'Product created successfully', 'product_id': new_product.product_id}), 201

# Get all products
# Get all products
@product_bp.route('', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        'product_id': product.product_id,
        'product_name': product.product_name,
        'product_description': product.product_description,
        'product_price': product.product_price,
        'stock_quantity': product.stock_quantity,
        'category_id': product.category_id
    } for product in products]), 200

# Get a specific product by ID
@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    images = ProductImage.query.filter_by(product_id=product_id).all()
    return jsonify({
        'product_id': product.product_id,
        'product_name': product.product_name,
        'product_description': product.product_description,
        'product_price': product.product_price,
        'stock_quantity': product.stock_quantity,
        'category_id': product.category_id,
        'images': [{'image_id': img.image_id, 'image_url': img.image_url, 'is_primary': img.is_primary} for img in images]
    }), 200

# Update a product
@product_bp.route('/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    data = request.get_json()
    product = Product.query.get_or_404(product_id)
    
    product.product_name = data.get('product_name', product.product_name)
    product.product_description = data.get('product_description', product.product_description)
    product.product_price = data.get('product_price', product.product_price)
    product.stock_quantity = data.get('stock_quantity', product.stock_quantity)
    product.category_id = data.get('category_id', product.category_id)
    
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'}), 200

# Delete a product
@product_bp.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'}), 200
