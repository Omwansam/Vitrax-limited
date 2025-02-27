from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import  Order, OrderStatus
from extensions import db

order_bp = Blueprint('orders', __name__)

# Create a new order
@order_bp.route('', methods=['POST'])
@jwt_required()
def create_order():
    data = request.get_json()
    user_id = get_jwt_identity()
    
    new_order = Order(
        user_id=user_id,
        total_amount=data.get('total_amount'),
        shipping_address=data.get('shipping_address')
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Order created successfully', 'order_id': new_order.order_id}), 201

# Get all orders (admin access recommended)
@order_bp.route('', methods=['GET'])
@jwt_required()
def get_orders():
    orders = Order.query.all()
    return jsonify([{
      
        'order_id': order.order_id,
        'user_id': order.user_id,
        'total_amount': order.total_amount,
        'order_status': order.order_status.value,
        'shipping_address': order.shipping_address,
        'order_date': order.order_date
    } for order in orders]), 200

# Get a specific order by ID
@order_bp.route('/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify({
        'order_id': order.order_id,
        'user_id': order.user_id,
        'total_amount': order.total_amount,
        'order_status': order.order_status.value,
        'shipping_address': order.shipping_address,
        'order_date': order.order_date
    }), 200

# Update order status (admin or user access based on logic)
@order_bp.route('/<int:order_id>/status', methods=['PUT'])
@jwt_required()
def update_order_status(order_id):
    data = request.get_json()
    order = Order.query.get_or_404(order_id)
    
    try:
        new_status = OrderStatus(data['order_status'])
        order.order_status = new_status
        db.session.commit()
        return jsonify({'message': 'Order status updated successfully'}), 200
    except ValueError:
        return jsonify({'error': 'Invalid order status'}), 400

# Delete an order (if allowed)
@order_bp.route('/<int:order_id>', methods=['DELETE'])
@jwt_required()
def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted successfully'}), 200
